const mongoDB = require("mongoose");

const orderSchema = new mongoDB.Schema(
  {
    datetime: {
      type: Date,
      default: Date.now(),
    },
    totalfee: {
      type: Number,
    },
    services: [
      {
        type: mongoDB.Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
  },
  { versionKey: false }
);

module.exports = mongoDB.model("Order", orderSchema);
