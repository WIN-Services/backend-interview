const mongoose = require("mongoose");

const serviceRecordSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String },
  },{
    strict: true
  }
)

const serviceModel = mongoose.model("services", serviceRecordSchema);

module.exports =  serviceModel;