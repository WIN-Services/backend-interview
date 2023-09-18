const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    total_fee: {
      type: Number,
      required: [true, 'Total fee is required'],
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceRecord',
        required: [true, 'Service Record is required'],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
