const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/winDB",{ useNewUrlParser: true })
.then(()=>{
    console.log("success")
}).catch(err=>console.log(err));

module.exports=mongoose;