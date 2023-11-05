const Controller = require("./controller");
const OrderService = require("../services/order-service");
const { logger } = require('../lib/log')

class OrderController extends Controller {

    /**
     *  @api {get} /api/v1/order returns the list of all orders
     *  @apiName order @apiVersion 1.0.0 
     *  @apiSuccess [Order] 
     *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
     *  @apiError Internal error HTTP/1.1 500
     *
    * */
    async get_orders(req, res, next) {
        logger.info('OrderController -> get_orders -> started');
        try {
            const os = new OrderService();
            const result = await os.get_all_orders();
            this.send_response(res, "success", result);
        } catch (e) {
            this.handle_error_response(error, res, next);
        }
    }

    /**
     *  @api {order} /api/v1/order that creates a new order
     *  @apiName order @apiVersion 1.0.0 
     *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
     *  @apiError Bad request HTTP/1.1 400 (Validation failed)
     *  @apiError Internal error HTTP/1.1 500
     *
    * */
    async create_order(req, res, next) {
        try {
            const input = req.body;
            const os = new OrderService();
            const result = await os.create_order(input);
            this.send_response(res, "success", result);
        } catch (error) {
            logger.error(error)
            this.handle_error_response(error, res, next);
        }
    }

    /**
     *  @api {get} /api/v1/order/:id returns the order that match the id.
     *  @apiName order @apiVersion 1.0.0 
     *  @apiSuccess order json 
     *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
     *  @apiError Bad request HTTP/1.1 404 (Not found)
     *  @apiError Internal error HTTP/1.1 500
     *
    * */
    async get_order_by_id(req, res, next) {
        try {
            const id = req.params.id;
            const os = new OrderService();
            const result = await os.get_order_by_id(id);
            this.send_response(res, "success", result);
        } catch (error) {
            this.handle_error_response(error, res, next);
        }
    }

    /**
     *  @api {delete} /api/v1/order/:id delete the order that match the id.
     *  @apiName order @apiVersion 1.0.0 
     *  @apiSuccess Success message
     *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
     *  @apiError Bad request HTTP/1.1 404 (Not found)
     *  @apiError Internal error HTTP/1.1 500
     *
    * */
    async delete_order_by_id(req, res, next) {
        try {
            const id = req.params.id;
            const os = new OrderService();
            await os.delete_order_by_id(id);
            this.send_response(res, "success");
        } catch (error) {
            this.handle_error_response(error, res, next);
        }
    }

     /**
     *  @api {put} /api/v1/order/:id update the order that match the id.
     *  @apiName order @apiVersion 1.0.0 
     *  @apiSuccess updated order json 
     *  @apiSuccessExample Success-Response: HTTP/1.1 200 OK
     *  @apiError Bad request HTTP/1.1 404 (Not found)
     *  @apiError Internal error HTTP/1.1 500
     *
    * */
    async update_order_by_id(req, res, next) {
        try {
            const id = req.params.id;
            const os = new OrderService();
            const response = await os.update_order_by_id(id, req.body);
            this.send_response(res, "success", response);
        } catch (error) {
            this.handle_error_response(error, res, next);
        }
    }
}

module.exports = OrderController;
