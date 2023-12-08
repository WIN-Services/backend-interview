const mongoose = require('mongoose') 

const orderSchema = new mongoose.Schema({
  datetime: { type: Date, default: Date.now },
  totalfee: { type: Number, required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ServiceRecord' }],
}) 

const Order = mongoose.model('Order', orderSchema) 

module.exports = Order 
