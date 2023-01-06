const mongoose = require('mongoose');

var services = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('services', services, 'services');