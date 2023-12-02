const mongoose = require('mongoose');
const { schemas } = require("../constants/text.constant");
const servicesSchema = mongoose.Schema({

    name: {
        type: String,
        unique: true,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    },
    fees:{
        type:Number,
        required:true
    },
    created_At: {
        type: Date,
        default: Date.now,
        required: true
    },
    updated_At: {
        type: Date,
        default: Date.now,
        required: true
    },
});

module.exports = mongoose.model(schemas.services, servicesSchema)

