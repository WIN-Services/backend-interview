const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
    {
        name: { 
            type: String,
            required: true,
        },
        price: {
            type: Number,
            default:0
        }
    },
    {
        timestamps: true,
    }
);

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;