import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ServiceSchema = new Schema(
  {
    name: {
      type: "string",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("service", ServiceSchema);
