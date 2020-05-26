const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');

const port=8000;
const expressLayouts=require('express-ejs-layouts');

const db=require('./config/mongoose');
const User=require('./models/usersDB');

app.use(cookieParser());
app.use(express.urlencoded());
app.use(expressLayouts);
// For extracting scripts and styles for diffrent body pages to the above or where we wnat to be
// placed in the Layout page
app.set('layout extractScripts',true);
app.set('layout extractStyles',true);

app.use(express.static('./assests'));
app.use('/',require('./routes'));
app.set('view engine','EJS');
app.set('views','./views')
app.listen(port,function(err){
    if(err){
        console.log(`WTF  error :${err}`);
        return ;
    }
   console.log(`Okay ! server run on port no: ${port}`); 
})




