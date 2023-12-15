import { ResponseHandler, DateHandler } from '../util/index.js';
import { StatusCodes } from '../constant/index.js';
import { OrderModel } from '../model/index.js';

class OrderController {
    /**
     * @author Swapnil
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<{message: *, data: *}|*>}
     */
    async createOrder(req, res){
        try {
            const { service_ids, total_fee } = req.body;
            const valid = await OrderController.validateOrder();
            if (!valid)
                return ResponseHandler(res, StatusCodes.BadRequest, "Not allowed order within 3 hours");

            const order = await OrderModel.createOrder({service_ids, total_fee});            
            return ResponseHandler(res, StatusCodes.Created, "Successfully created order",order)
        } catch (error) {
            return ResponseHandler(res, StatusCodes.BadRequest, "Bad Request")
        }
    }

    /**
     * Check for existing order within 3 hours of the current Order DateTime
     * @returns boolean
     */
    static async validateOrder() {
        const fromDate = new Date();
        const toDate = new Date();
        toDate.setHours(toDate.getHours() - 3);
        const checkFromDate = DateHandler.formatDate(fromDate);
        const checkToDate = DateHandler.formatDate(toDate);
        const res = await OrderModel.checkOrderExists(checkFromDate, checkToDate);
        return !res;
    }

    /**
     * @author Swapnil
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<{message: *, data: *}|*>}
     */
    async updateOrder(req, res){
        try {
            const { service_ids, total_fee } = req.body;
            const { id :order_id } = req.params;
            const order = await OrderModel.updateOrder(order_id, total_fee, service_ids);
            if (!order)
                return ResponseHandler(res, StatusCodes.BadRequest, "Please provide valid order id")
            return ResponseHandler(res, StatusCodes.Ok, "Successfully updated order")
        } catch (error) {
            return ResponseHandler(res, StatusCodes.BadRequest, "Bad Request")
        }   
    }

    /**
     * @author Swapnil
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<{message: *, data: *}|*>}
     */
    async deleteOrder(req, res){
        try {
            const { id: order_id } = req.params;
            const order = await OrderModel.deleteOrderById(order_id);
            if (!order) 
                return ResponseHandler(res, StatusCodes.BadRequest, "Please provide valid order id")
            return ResponseHandler(res, StatusCodes.Ok, "Successfully deleted order")
        } catch (error) {
            return ResponseHandler(res, StatusCodes.InternalServerError, "Something Went Wrong !!")
        }   
    }

    /**
     * @author Swapnil
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<{message: *, data: *}|*>}
     */
    async getOrder(req, res){
        try {
            const { id } = req.params
            const order = await OrderModel.getOrderById(id);
            if (!order) return ResponseHandler(res, StatusCodes.NotFound, "Order not found")
            return ResponseHandler(res, StatusCodes.Ok, "Successfully fetched order", order)
        } catch (error) {
            console.error(error);
            return ResponseHandler(res, StatusCodes.InternalServerError, "Something Went Wrong !!")
        }   
    }

    /**
     * @author Swapnil
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<{message: *, data: *}|*>}
     */
    async getAllOrders(req, res){
        try {
            let { page, limit } = req.query
            page = page && page > 0 ? parseInt(page) : 1;
            limit = limit ? parseInt(limit) : 100;
            const offset = (page - 1) * limit
            const orders = await OrderModel.getOrders(offset, limit);
            return ResponseHandler(res, StatusCodes.Ok, "Successfully fetched orders", orders)
        } catch (error) {
            return ResponseHandler(res, StatusCodes.InternalServerError, "Something Went Wrong !!")
        }   
    }
}

export default new OrderController();