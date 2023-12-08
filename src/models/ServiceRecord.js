const mongoose = require('mongoose') 

const serviceRecordSchema = new mongoose.Schema({
  name: { type: String, required: true },
}) 

const ServiceRecord = mongoose.model('ServiceRecord', serviceRecordSchema) 

module.exports = ServiceRecord 
