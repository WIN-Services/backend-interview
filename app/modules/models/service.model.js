const mongoose = require("mongoose");
const softDelete = require("mongoosejs-soft-delete");

const ServiceSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ServiceSchema.plugin(softDelete);
module.exports = mongoose.model("Services", ServiceSchema);
