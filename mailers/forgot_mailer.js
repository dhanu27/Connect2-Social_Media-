const nodemailer=require('../config/nodemailer');

 exports.forgotPassword=(user)=>{
     console.log("%%%%%Mail User %%%%%",user);
     let htmlString=nodemailer.renderTemplate({user:user},'/forgotPassword.ejs');
     console.log("efwefrf",htmlString)
   nodemailer.transporter.sendMail({
    from: 'bhardwajdhanu08@gmail.com', // sender address
    to: user.email, // list of receivers
    subject: "Forgot Password", // Subject line
    html: htmlString, // html body
   },(err,info)=>{
       if(err){console.log("Error in sending comment mail",err); return;}
       console.log("Meassge sent",info);
       return ;
   });
  
}