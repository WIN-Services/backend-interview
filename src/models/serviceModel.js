const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },{timestamps: true});

module.exports = mongoose.model("service", serviceSchema);