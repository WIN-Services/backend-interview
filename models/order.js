const mongoose = require("mongoose")
let Records = require("./serviceRecords")
/*
[
  {
    "id": "223",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "123",
        }
    ]
  },
  {
    "id": "224",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "789",
        }
    ]
  },
  {
    "id": "225",
    "datetime": "2022-11-01T11:11:11.111Z",
    "totalfee": 100,
    "services": [
        {
        "id": "456",
        }
    ]
  }
]
*/
let orderSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    datetime:{
        type: Date,
        required: true,
        default: new Date()
    },
    totalfee:{
        type: Number,
        required: true
    },
    services: [{type: mongoose.Schema.Types.ObjectId, ref: Records}]
})

let Order = mongoose.model("Order",orderSchema);

module.exports = Order;