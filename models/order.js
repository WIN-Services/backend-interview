
const mongoose = require('mongoose');
const Service = require('./service'); 

const orderSchema = new mongoose.Schema({
  
  datetime: {
    type: Date,
    required: true,
  },
  totalfee: {
    type: Number,
    required: true,
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
});

module.exports = mongoose.model('Order', orderSchema);
