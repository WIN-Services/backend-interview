const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  id: String,
  datetime: Date,
  totalfee: Number,
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;