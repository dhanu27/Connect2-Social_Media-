const express=require('express');
const app=express();
const port=8000;

app.listen(port,function(err){
    if(err){
        console.log(`WTF  error :${err}`);
        return ;
    }
   console.log(`Okay ! server run on port no: ${port}`); 
})




