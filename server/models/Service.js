const mongoose = require('mongoose');
const AppConstants = require('../constants/app');
const {ulid} = require("ulid");

const ServiceSchema = new mongoose.Schema({
    _id: {type: String, required: true, default: () => ulid()},
    name: {type: String, required: true, },
}, {
    id: false,
    timestamps: true,
    minimize: false,
    autoCreate: true,
    autoIndex: true
});

// Custom query
ServiceSchema.query.byName = function (name) {
    const regex = new RegExp(`${name}`, 'gi');
    return this.where('name').regex(regex);
};

ServiceSchema.query.byIDGT = function (id) {
    return this.where('_id').gt(id);
};

// Custom getters
ServiceSchema.path('createdAt').get((v) => v && v.getTime());
ServiceSchema.path('updatedAt').get((v) => v && v.getTime());

const Model = mongoose.model(AppConstants.MODELS.SERVICE, ServiceSchema, 'Services');

module.exports = Model;