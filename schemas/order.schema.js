const mongoose=require("../provider/mongo.provider");
const serviceSchema=require("./service.schema");

const orderSchema=new mongoose.Schema({
    person:{type:String, required: true, unique: true},
    datetime: {date:{type:Number}, time:{type:Number}},
    totalFee:{type:Number,required: true},
    services:{
        type:[serviceSchema],
        required:true
    }
});


const Orders=mongoose.model("Orders",orderSchema);
module.exports=Orders;