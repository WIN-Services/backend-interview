const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  id: String,
  name: String,
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;