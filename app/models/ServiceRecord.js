const mongoose = require('mongoose');

const serviceRecordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
    },
    fee: {
      type: Number,
      required: [true, 'Service fee is required'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('ServiceRecord', serviceRecordSchema);
