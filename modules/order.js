//Require Modules
var mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");


//Making Schema
const orderschema = new mongoose.Schema({
    id: {
        type : Number
    },
    totalfee:{
        type : Number
    },
    service_id:{
        type : Number,
        ref : "services"
    }

},{timestamps:true})



//Making Auto Increment
autoIncrement.initialize(mongoose.connection);
orderschema.plugin(autoIncrement.plugin ,{
    model:"orderschema",
    startedAt:1,
    increasedBy:1
})

//Exporting Schema
var order = mongoose.model('order' , orderschema)

module.exports = {order}