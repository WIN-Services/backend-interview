Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const express = require("express");
const router = express.Router();
const orders_1 = require("../services/orders");
/**
 *
 *
 * Returns the all orders
 */
router.get('/', async (req, res, next) => {
    try {
        const orderService = new orders_1.OrderService(req);
        const apiResponse = await orderService.getOrders();
        res.status(apiResponse.status).send(apiResponse.data);
    }
    catch (err) {
        return next(err);
    }
});
/**
 *
 *
 * Creates a new order entry and return it with an id
 */
router.post('/', async (req, res, next) => {
    try {
        const orderService = new orders_1.OrderService(req);
        const apiResponse = await orderService.createOrder(req.body);
        res.status(apiResponse.status).send(apiResponse.data);
    }
    catch (err) {
        return next(err);
    }
});
/**
 *
 *
 * Updates an exisitng order using provided order object
 */
router.put('/', async (req, res, next) => {
    try {
        const orderService = new orders_1.OrderService(req);
        const apiResponse = await orderService.updateOrder(req.body);
        res.status(apiResponse.status).send(apiResponse.data);
    }
    catch (err) {
        return next(err);
    }
});
/**
 *
 *
 * Returns the order object related to the given orderId
 */
router.get('/:orderId', async (req, res, next) => {
    try {
        const orderService = new orders_1.OrderService(req);
        const apiResponse = await orderService.getOrder(req.params.orderId);
        res.status(apiResponse.status).send(apiResponse.data);
    }
    catch (err) {
        return next(err);
    }
});
/**
 *
 *
 * Deletes the order object related to the given orderId
 */
router.delete('/:orderId', async (req, res, next) => {
    try {
        const orderService = new orders_1.OrderService(req);
        const apiResponse = await orderService.deleteOrder(req.params.orderId);
        res.status(apiResponse.status).send(apiResponse.data);
    }
    catch (err) {
        return next(err);
    }
});
exports.ordersRouter = router;
