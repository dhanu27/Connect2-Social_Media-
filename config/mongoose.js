const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost/Connect2_development");
const db=mongoose.connection;

db.on("error",console.error.bind(console,"WTF Error in Moongoose ODM"));
db.once('open',function(){
  console.log("Connected To Databse");
});
module.exports=db;