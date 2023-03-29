const mongoose = require('mongoose')

const Schema=mongoose.Schema;

let schema= new Schema({
    id:{
        type: String,
        required:true
    },
    datetime:{
        type: String,
        default:new Date().toISOString()
    },
    totalfee:{
        type: Number,
        required: true
    },
    services: {
        type: Array,
        default: []
    } 
});

const Orders = mongoose.model('Orders',schema);

module.exports=Orders;
