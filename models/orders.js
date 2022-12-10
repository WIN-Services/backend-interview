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
    services : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Service'
    }]
});

const Order = mongoose.model('Order',orderSchema);
module.exports = Order;