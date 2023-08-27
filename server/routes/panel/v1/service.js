const router = require('express').Router();
const Service = require('../../../modules/Service');
const Utils = require('../../../utils/Utils');
const http = require("http");

router.get('/:id',  async (req, res, next) => {
    try {
        const {id} = req.params;
        const query = req.query;
        const opts = {};
        const item = await Service.get(id, opts);
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
        const item = await Service.update(id, obj);
        Utils.successResponse(res, item);
    } catch (e) {
        console.warn(e);
        next(e);
    }
});

router.post('/',  async (req, res, next) => {
    try {
        const {obj} = req.body;
        const item = await Service.create(obj);
        Utils.successResponse(res, item, { statusCode : 201 });
    } catch (e) {
        console.warn(e);
        next(e);
    }
});

router.put('/:id',  async (req, res, next) => {
    try {
        const {id} = req.params;
        const {obj} = req.body;
        const item = await Service.update(id, obj);
        Utils.successResponse(res, item);
    } catch (e) {
        console.warn(e);
        next(e);
    }
});

router.get('/',  async (req, res, next) => {
    try {
        const query = req.query;
        if (query.count) query.count = Number(query.count);
        const result = await Service.getMany(query);
        Utils.successResponse(res, result);
    } catch (e) {
        console.warn(e);
        next(e);
    }
});

module.exports = router;
