//Require Modules
var mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

//Making Schema
const serviceSchema = new mongoose.Schema({
    id:{
        type : Number   
    },
    name: {
        type : String
    },

},{timestamps:true})


//Making Auto Increment
autoIncrement.initialize(mongoose.connection);
serviceSchema.plugin(autoIncrement.plugin ,{
    model:"serviceSchema",
    startedAt:1,
    increasedBy:1
})

//Exporting Schema
var services = mongoose.model('services' , serviceSchema)

module.exports = {services}