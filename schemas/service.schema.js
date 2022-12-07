const mongoose=require("../provider/mongo.provider");

const serviceSchema=new mongoose.Schema({
    name:String
})

module.exports=serviceSchema;