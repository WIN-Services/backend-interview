const mongoose = require("mongoose");

// Define service schema
const serviceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Service", serviceSchema);
