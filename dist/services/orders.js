var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const orders_1 = require("../models/orders");
const services_1 = require("../models/services");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const api_response_type_1 = require("../util/api-response-type");
class OrderService {
    constructor(req) {
        this.request = req;
    }
    /**
     * @param {Object} order Order object
     */
    async getOrders(limit = 500) {
        const orders = await orders_1.Order.find({}).limit(Math.min(limit, 500));
        return new api_response_type_1.SuccessResponse(JSON.parse(JSON.stringify(orders)));
    }
    /**
     * @param {String} orderId orderId string
     */
    async getOrder(orderId) {
        if (!orderId || !mongoose_2.Types.ObjectId.isValid(orderId)) {
            return new api_response_type_1.BadRequestError('orderId not present or is invalid');
        }
        const order = await orders_1.Order.findById(orderId).lean();
        if (!order) {
            return new api_response_type_1.BadRequestError("orderId not found");
        }
        return new api_response_type_1.SuccessResponse(JSON.parse(JSON.stringify(order)));
    }
    /**
     * @param {Object} order Order object
     */
    async createOrder(order) {
        if (order.services.find(x => !mongoose_2.Types.ObjectId.isValid(x.id))) {
            return new api_response_type_1.BadRequestError("Invalid service id passed");
        }
        if (typeof order.totalfee != 'number') {
            return new api_response_type_1.BadRequestError("totalfee must be an integer");
        }
        const ids = order.services.map(x => new mongoose_1.default.Types.ObjectId(x.id));
        // serviceIds in order data should exist in db
        const services = await services_1.Service.find({ _id: { $in: ids } });
        if (services.length != ids.length) {
            return new api_response_type_1.BadRequestError("service ids present in request are not present in db");
        }
        const latestOrder = await orders_1.Order.findOne({}, {}, { sort: { 'created_at': -1 } }).limit(1).lean();
        if (latestOrder && Date.now(latestOrder.createdAt) > (Date.now() - 3 * 60 * 60)) {
            return new api_response_type_1.BadRequestError("Last order was made within last 3 hours, please try after sometime");
        }
        const res = await orders_1.Order.create(order);
        return new api_response_type_1.SuccessResponse(JSON.parse(JSON.stringify(res)));
    }
    /**
     * @param {Object} order Order object
     */
    async updateOrder(order) {
        if (!order || !order._id) {
            return new api_response_type_1.BadRequestError("order or orderId is missing");
        }
        if (typeof order.totalfee != Number) {
            return new api_response_type_1.BadRequestError("totalfee must be an integer");
        }
        id = order._id;
        delete order._id;
        const res = await orders_1.Order.findOneAndUpdate({ _id: id }, order);
        return new api_response_type_1.SuccessResponse(JSON.parse(JSON.stringify(res)));
    }
    /**
     * @param {String} orderId orderId string
     */
    async deleteOrder(orderId) {
        if (!orderId || !mongoose_2.Types.ObjectId.isValid(orderId)) {
            return new api_response_type_1.BadRequestError("orderId not present or is invalid");
        }
        const res = await orders_1.Order.findOneAndDelete({ _id: orderId });
        if (!res) {
            return new api_response_type_1.BadRequestError('invalid orderId present, unable to delete order');
        }
        return new api_response_type_1.SuccessResponse(JSON.parse(JSON.stringify(res)));
    }
}
exports.OrderService = OrderService;
