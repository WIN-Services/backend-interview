const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    collection: "services",
  }
);

const ServiceModel = mongoose.model("Service", schema);

module.exports = {
  ServiceModel,
};
