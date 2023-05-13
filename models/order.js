const mongoose = require('mongoose');

// schema maps to a collection
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderId: {
    type: Number,
    required: true,
    unique: true
  },
  totalFee: {
    type: Number,
    required: true,
  },
  services: {
    type: Array,
  },
  createdAt:{
    type: Date,
    required: true
  }, 
  updatedAt:{
    type: Date,
    required: true
  }
});


module.exports = mongoose.model('Order', orderSchema);