const _ = require('lodash');
const moment = require('moment');
const OrderModel = require('../models/Order');
const BaseError = require('../utils/Errors');

const Helper = {
    async getLastChangedObjByTimestamp(timestamp) {
        return OrderModel.findOne().getLastChangedDOCByTimestamp(timestamp);
    }
};

const Module = {
    async create(buildObj, opts = {lean: true}) {
        const obj = _.omit(buildObj, ['__v', 'createdAt', 'updatedAt']);
        // checkLastChangedDoc
        const doc = await Helper.getLastChangedObjByTimestamp(moment().subtract(3, 'h').valueOf());
        if (doc) {
            const time = moment(doc.updatedAt).add(3, 'h').diff(moment(), 'm');
            throw new BaseError('ORDER_RECENTLY_UPDATED', {time});
        }
        const item = new OrderModel(obj);
        await item.save();
        return opts.lean ? item.toJSON() : item;
    },
    async update(id, buildObj, opts = {lean: true}) {
        let item = await OrderModel.findById(id);
        if (!item) throw new BaseError('DOC_NOTFOUND', {name: 'Order', id});
        // checkLastChangedDoc
        const doc = await Helper.getLastChangedObjByTimestamp(moment().subtract(3, 'h').valueOf());
        if (doc) {
            const time = moment(doc.updatedAt).add(3, 'h').diff(moment(), 'm');
            throw new BaseError('ORDER_RECENTLY_UPDATED', {time});
        }
        const obj = _.omit(buildObj, ['__v', 'createdAt', 'updatedAt']);
        item = Object.assign(item, obj);
        await item.save();
        return opts.lean ? item.toJSON() : item;
    },
    async get(id, {lean = true, populate = false} = {}) {
        const item = await OrderModel.findById(id);
        if (!item) throw new BaseError('DOC_NOTFOUND', {name: 'Order', id});
        return lean ? item.lean() : item;
    },
    async getMany(opts = {}) {
        const {count = 10, offset = '!', name, lean = true} = opts;
        const baseQ = OrderModel.find();
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
    async delete(id) {
        return OrderModel.deleteOne({ _id: id });
    }
};

module.exports = Module;
