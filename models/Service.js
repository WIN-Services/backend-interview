const mongoose = require('mongoose');
var serviceSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    index:Number,
    cost: Number,
},
{
  timestamps: true
})
module.exports = mongoose.model("Service", serviceSchema);
