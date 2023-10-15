const mongoose = require('mongoose')

var serviceSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    fee: Number
});

module.exports = mongoose.model("services", serviceSchema)