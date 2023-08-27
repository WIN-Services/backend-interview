const mongoose = require('mongoose');
const {ulid} = require('ulid');
const AppConstants = require('../constants/app');

const OrderSchema = new mongoose.Schema({
    _id: {type: String, required: true, default: () => ulid()},
    totalFee: {type: Number, required: true},
    services: {type: [String], required: true, ref: AppConstants.MODELS.SERVICE}
}, {
    id: false,
    timestamps: true,
    minimize: false,
    autoCreate: true,
    autoIndex: true
});

// Indexes
OrderSchema.index({updatedAt: -1});

// Custom query
OrderSchema.query.getLastChangedDOCByTimestamp = function (timestamp = Date.now()) {
    return this.where('updatedAt').gte(timestamp);
}

OrderSchema.query.byIDGT = function (id) {
    return this.where('_id').gt(id);
};

// Custom getters
OrderSchema.path('createdAt').get((v) => v && v.getTime());
OrderSchema.path('updatedAt').get((v) => v && v.getTime());

const Model = mongoose.model(AppConstants.MODELS.ORDER, OrderSchema, 'Orders');

module.exports = Model;