const mongoDB = require("mongoose");

const serviceSchema = new mongoDB.Schema(
  {
    name: {
      type: String,
      require: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoDB.model("Service", serviceSchema);
