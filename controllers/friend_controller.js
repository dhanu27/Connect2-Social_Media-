const User=require('../models/usersDB');
const Friends=require('../models/friends');

module.exports.acceptRequest=async function(req,res){
     try{
        let user= await User.findById(req.user.id);
        let userFriend=await User.findById(req.params.id);
        let alreadyExist= user.friends.includes(req.params.id);
           console.log("Is he is your Friend",alreadyExist);
        if(alreadyExist){
          let friend=await  Friends.deleteOne({
               $or:[ {from_user:req.user.id,to_user:req.params.id},
                     {to_user:req.user.id,from_user:req.params.id} 
                   ]
            })
            console.log("$$$$Friend$$$$",friend);
           user.friends.pull(req.params.id);
           userFriend.friends.pull(req.user.id);
        }else{
           let friends=await Friends.create({
               from_user:req.params.id,
               to_user:req.user.id
           });
          user.friends.push(req.params.id); 
          userFriend.friends.push(req.user.id);
        }
        userFriend.save();
        user.save();
       if(req.xhr){
        res.status(200).json({
            message:"Success"
          })
       } 
    }catch(err){
        console.log("Error in Friend's Add function",err);
        res.status(540).json({
              message:"Internal Server Error"
        })
    }   
}