const { Schema, model } = require("mongoose")

const serviceSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
  })
  
  
  const Service = model("Service", serviceSchema)
  module.exports = Service