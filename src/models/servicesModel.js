const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Service = mongoose.model('service', serviceSchema);

module.exports = Service;
