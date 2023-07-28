
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    id: {type: Number,required:true, unique: true},
    name: {type: String, required: true}
});


const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;