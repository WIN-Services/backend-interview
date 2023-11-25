import * as mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  // id: {type: String, autoIn},
  name: {type: String, required: true},
  isDeactive: {type: Boolean, default: false},
  versionKey: false
});

export default mongoose.model("services", serviceSchema);