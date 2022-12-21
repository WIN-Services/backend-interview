const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    dateTime : {  
        type: Date,
        default : Date.now    
    },
    totalFee : {
        type : String,
        required : true
    },
    services : {
        type : []
    }
});

const order = mongoose.model('order', orderSchema);
module.exports = order;