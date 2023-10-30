const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serviceSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true }
  },
  { _id: false } // Set _id to false
);

// Define the Order schema
const orderSchema = new Schema({
  id: { type: String, required: true },
  datetime: { type: Date, default: Date.now },
  totalfee: { type: Number, required: true },
  services: [serviceSchema],
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order