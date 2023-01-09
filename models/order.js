const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let OrderSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    datetime: {
        type: Date,
        default: Date.now,
    },
    totalfee: {
        type: Number,
        default: 0
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
    }]
});

module.exports = mongoose.model('Order', OrderSchema);