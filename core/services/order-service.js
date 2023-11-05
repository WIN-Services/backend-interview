const OrderModel = require("../schemas/orderSchema");
const ServiceModel = require("../schemas/serviceSchema");
const Controller = require("../controllers/controller");
const { logger } = require("../lib/log");

class OrderService {
    async get_all_orders() {
        logger.info("OrderService -> get_all_orders -> started");

        // Fetch all orders and populate services
        const orders = await OrderModel.find(
            {},
            {
                _id: 0,
                __v: 0,
            }
        ).populate({
            path: "services",
            select: "-_id -__v",
        });
        return orders;
    }

    async create_order(input) {
        logger.info("OrderService -> create_order -> started");
        let order = new OrderModel(input);
        // Validate the order
        let error = order.validateSync();

        if (error) {
            let e = Controller.get_error("badRequest", error.message);
            throw e;
        }
        // Save the order to the database and populate services
        let result = await order.save();
        await result.populate("services");
        return result;
    }

    async delete_order_by_id(id) {
        logger.info("OrderService -> delete_order_by_id -> started");
        let order = null;

        // Find and delete the order by ID, excluding _id and __v
        order = await OrderModel.findOneAndDelete(
            {
                order_id: id,
            },
            {
                _id: 0,
                __v: 0,
            }
        );
        if (!order) {
            let e = Controller.get_error("notFound", `Order not found for id ${id}`);
            throw e;
        }
        return order;
    }

    async get_order_by_id(id) {
        logger.info("OrderService -> get_order_by_id -> started");
        let order = null;

        // Find the order by ID, excluding _id and __v, and populate services
        order = await OrderModel.findOne(
            {
                order_id: id,
            },
            {
                _id: 0,
                __v: 0,
            }
        ).populate({
            path: "services",
            select: "-_id -__v",
        });

        if (!order) {
            let e = Controller.get_error("notFound", `Order not found for id ${id}`);
            throw e;
        }

        return order;
    }

    async update_order_by_id(id, input) {
        logger.info("OrderService -> update_order_by_id -> started");
        let order = null;

        const { order_id, totalfee, services } = input;

        // find an existing order
        order = await OrderModel.findOne(
            {
                order_id: id,
            },
            {
                _id: 0,
                __v: 0,
            }
        );
    
        if (!order) {
            let e = Controller.get_error("notFound", `Order not found for id ${id}`);
            throw e;
        }

        const current_time = new Date();
        const existing_order_time = new Date(order.datetime);

        const time_diff_in_hrs = Math.abs(
            (current_time - existing_order_time) / (1000 * 60 * 60)
        );

        // if time diff is less than 3 hours than cant place order
        if (time_diff_in_hrs < 3) {
            let e = Controller.get_error(
                "badRequest",
                "Please update order after 3 hours"
            );
            throw e;
        }
       
        if (order_id) order.order_id = order_id;
        if (totalfee) order.totalfee = totalfee;
        if (services) order.services = services;

        order.datetime = new Date();

        // validate with the schema 
        let error = order.validateSync();

        if (error) {
            let e = Controller.get_error("badRequest", error.message);
            throw e;
        }

        await OrderModel.updateOne({ order_id: id }, { $set: order }).populate({
            path: "services",
            select: "-_id -__v",
        });

        return order;
    }
}
module.exports = OrderService;
