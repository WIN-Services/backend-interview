const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
})
module.exports = mongoose.model('Service', serviceSchema)