const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Service Record schema
const serviceSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
});


const Service = mongoose.model('Service', serviceSchema);

module.exports = Service