const mongoose = require('mongoose');

// schema maps to a collection
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  serviceId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
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


module.exports = mongoose.model('Service', serviceSchema);