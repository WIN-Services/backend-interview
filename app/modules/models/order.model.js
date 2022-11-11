const mongoose = require("mongoose");
const softDelete = require("mongoosejs-soft-delete");

const OrderSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    totalfee: {
      type: Number,
      required: true,
    },
    services: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
      },
    ],
    datetime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.plugin(softDelete);
module.exports = mongoose.model("Orders", OrderSchema);
