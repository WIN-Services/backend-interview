const mongoose = require("mongoose");

const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    name: { type: String, required: true },
    
  },
  { timestamps: true }
);


module.exports = mongoose.model('service', serviceSchema);