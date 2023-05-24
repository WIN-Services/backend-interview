/*
[
  {
    "id": 123,
    "name": "Inspection"
  },
  {
    "id": 789,
    "name": "Testing"
  },
  {
    "id": 456,
    "name": "Analysis"
  }
]
*/

const mongoose = require("mongoose")

let recordSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
})

let Record = mongoose.model("Record",recordSchema);

module.exports = Record;