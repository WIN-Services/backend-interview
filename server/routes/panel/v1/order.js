const router = require('express').Router();
const Order = require('../../../modules/Order');
const Utils = require('../../../utils/Utils');

router.get('/:id',  async (req, res, next) => {
    try {
        const {id} = req.params;
        const query = req.query;
        const opts = {};
        const item = await Order.get(id, opts);
        Utils.successResponse(res, item);
    } catch (e) {
        console.warn(e);
        next(e);
    }
});

router.patch('/:id',  async (req, res, next) => {
    try {
        const {id} = req.params;
        const {obj} = req.body;
        const item = await Order.update(id, obj);
        Utils.successResponse(res, item);
    } catch (e) {
        console.warn(e);
        next(e);
    }
});

router.post('/',  async (req, res, next) => {
    try {
        const {obj} = req.body;
        const item = await Order.create(obj);
        Utils.successResponse(res, { statusCode: 201, ...item });
    } catch (e) {
        console.warn(e);
        next(e);
    }
});

router.put('/:id',  async (req, res, next) => {
    try {
        const {id} = req.params;
        const {obj} = req.body;
        const item = await Order.update(id, obj);
        Utils.successResponse(res, item);
    } catch (e) {
        console.warn(e);
        next(e);
    }
});

router.get('/',  async (req, res, next) => {
    try {
        const query = req.query;
        if (query.populate) query.populate = query.populate === 'true';
        if (query.offset) query.offset = Number(query.offset);
        if (query.count) query.count = Number(query.count);
        const result = await Order.getMany(query);
        Utils.successResponse(res, result);
    } catch (e) {
        console.warn(e);
        next(e);
    }
});

router.delete('/:id',  async (req, res, next) => {
    try {
        const {id} = req.params;
        await Order.delete(id);
        Utils.successResponse(res, true);
    } catch (e) {
        console.warn(e);
        next(e);
    }
});

module.exports = router;
