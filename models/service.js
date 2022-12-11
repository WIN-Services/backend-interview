const mongoose = require('mongoose');

//ServiceSchema
const ServiceSchema = mongoose.Schema({
    name:{
        type:String,
        unique: true,
        required:true,
     },
});

const Service = module.exports = mongoose.model('service', ServiceSchema);
