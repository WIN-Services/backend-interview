const mongoose = require('mongoose')

const Schema=mongoose.Schema;

let schema= new Schema({
    id:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required: true
    }
});

const Services = mongoose.model('Services',schema);

module.exports=Services;
