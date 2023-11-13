const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  _id: { 
    type: Number,
    required: true,
    alias: 'id',
  },
  name: {
    type: String,
    required: true
  }
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
