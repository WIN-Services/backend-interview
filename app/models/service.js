const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const ServiceSchema = new mongoose.Schema(
  {
    sv_id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "OFF",
      enum: ["ON", "OFF"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("service", ServiceSchema);
