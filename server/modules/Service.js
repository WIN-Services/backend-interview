const _ = require('lodash');
const ServiceModel = require('../models/Service');
const BaseError = require('../utils/Errors');

const Module = {
    async create(buildObj, opts = {lean: true}) {
        const obj = _.omit(buildObj, ['__v', 'createdAt', 'updatedAt']);
        const item = new ServiceModel(obj);
        await item.save();
        return opts.lean ? item.toJSON() : item;
    },
    async update(id, buildObj, opts = {lean: true}) {
        let item = await ServiceModel.findById(id);
        if (!item) throw new BaseError('DOC_NOTFOUND', {name: 'Service', id});
        const obj = _.omit(buildObj, ['__v', 'createdAt', 'updatedAt']);
        item = Object.assign(item, obj);
        await item.save();
        return opts.lean ? item.toJSON() : item;
    },
    async get(id, {lean = true, populate = false} = {}) {
        const item = await ServiceModel.findById(id);
        if (!item) throw new BaseError('DOC_NOTFOUND', {name: 'Service', id});
        return lean ? item.lean() : item;
    },
    async getMany(opts = {}) {
        const {count = 10, offset = '!', name, lean = true} = opts;
        const baseQ = ServiceModel.find();
        let hasMore = false;

        const query = baseQ.byIDGT(offset).limit(count + 1);

        const list = await (lean ? query.lean() : query);

        if (list.length === count + 1) {
            list.pop();
            hasMore = true;
        }

        return {
            list,
            offset: list.length ? list[list.length - 1]._id : null,
            hasMore
        };
    },
};

module.exports = Module;
