const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, 
{   
    versionKey: false,
    timestamps: true
});

ServiceSchema.index({ createdAt: -1 });
module.exports = mongoose.model('Services', ServiceSchema);