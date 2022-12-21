const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ServiceSchema = new Schema({
    serviceId: {
        type: String
    },
    serviceName: {
        type: String
    },
    serviceDescription: {
        type: String
    }
},{timestamps:true})

module.exports = mongoose.model('service', ServiceSchema);
