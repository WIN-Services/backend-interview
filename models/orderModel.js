const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    totalfee: {
        type: Number,
        default: 0
    },
    datetime : {
        type : Date,
        default : Date.now
    },
    services: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Services",
    }]
}, 
{
    versionKey: false,
    timestamps: true
});

OrderSchema.index({ createdAt: -1 });
module.exports = mongoose.model('Orders', OrderSchema);