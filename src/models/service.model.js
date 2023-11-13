const mongoose = require('mongoose');

// Define the Service schema
const serviceSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    fee:
    {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('service', serviceSchema);

