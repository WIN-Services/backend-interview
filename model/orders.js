const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orders = new Schema({
  id: {
    type: Number,
    required: true
  },
  totalfee: {
    type: Number,
    required: true
  },
  services:[{type: String,
    enum: ['123', '798', '456']}]},
    { timestamps:true  }
  );

module.exports = mongoose.model('orders', orders);