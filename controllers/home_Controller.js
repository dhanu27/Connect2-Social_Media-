// module.exports=

module.exports.home=function(req,res){
    console.log("Inside a Home Controller");
    return res.render('home',{
        title:"Home"
    });
    
};
