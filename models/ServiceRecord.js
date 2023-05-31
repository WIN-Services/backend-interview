// models/ServiceRecord.js
const mongoose = require("mongoose");

const serviceRecordSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

const ServiceRecord = mongoose.model("ServiceRecord", serviceRecordSchema);

module.exports = ServiceRecord;
