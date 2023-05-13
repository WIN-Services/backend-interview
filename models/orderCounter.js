const mongoose = require('mongoose');

// schema maps to a collection
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  orderCounter: {
    type: Number,
    required: true,
  },
});


module.exports = mongoose.model('OrderCounter', counterSchema);