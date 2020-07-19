const nodemailer=require('../config/nodemailer');

 exports.newComment=(comment)=>{
     console.log("%%%%%Mail User %%%%%",comment);
     let htmlString=nodemailer.renderTemplate({comment:comment},'/posts/postComment.ejs');
     console.log("efwefrf",htmlString)
   nodemailer.transporter.sendMail({
    from: 'bhardwajdhanu08@gmail.com', // sender address
    to: comment.user.email, // list of receivers
    subject: "New Comment on your post!", // Subject line
    html: htmlString, // html body
   },(err,info)=>{
       if(err){console.log("Error in sending comment mail",err); return;}
       console.log("Meassge sent",info);
       return ;
   });
  
}