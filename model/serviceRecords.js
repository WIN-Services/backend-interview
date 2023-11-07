const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceRecords = new Schema({
  id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('serviceRecords', serviceRecords);