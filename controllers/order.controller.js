const Order = require("../models/order.model");
const HELPER_METHODS = require("../helpers/order.helper");

/*
 * @route - GET api/order/:id
 * @description - get order
 */
getOrder = async (req, res) => {
    try {
        // validate request
        if (!req.params || !req.params.id) {
            return res.status(400).json({
                message: "Bad Request",
                data: null,
            });
        }
        // get order by Id
        const order = await Order.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Order fetched successfully",
            data: order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
};

/*
 * @route - POST api/order
 * @description - create Orders
 */
createOrder = async (req, res) => {
    try {
        // validate request
        if (!req.body || !req.body.services || !req.body.services.length) {
            return res.status(400).json({
                message: "Bad Request",
                data: null,
            });
        }

        // check for services
        const validServices = await HELPER_METHODS.validateServices(
            req.body.services
        );
        if (!validServices) {
            return res.status(404).json({
                message: "Services Not Found",
                data: null,
            });
        }

        // check for pre-existing order for past three hours
        const existingOrdersOfPastThreeHours =
            await HELPER_METHODS.getExistingOrdersOfPastThreeHours(req.body.services);
        if (
            existingOrdersOfPastThreeHours &&
            existingOrdersOfPastThreeHours.length
        ) {
            // order cannot be created
            // return error
            return res.status(405).json({
                message:
                    "Cannot create order within three hours of a pre-existing order",
                data: null,
            });
        }

        // create order
        const order = await Order.create({
            totalfee: req.body.totalfee,
            services: req.body.services,
        });
        res.status(201).json({
            success: true,
            message: "Order Created Successfully",
            data: order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
};

/*
 * @route - PUT api/order/:id
 * @description - update order
 */
updateOrder = async (req, res) => {
    try {
        // validate request
        if (
            !req.params ||
            !req.params.id ||
            !req.body ||
            !req.body.services ||
            !req.body.services.length
        ) {
            return res.status(400).json({
                message: "Bad Request",
                data: null,
            });
        }

        // check for services
        const validServices = await HELPER_METHODS.validateServices(
            req.body.services
        );
        if (!validServices) {
            return res.status(404).json({
                message: "Services Not Found",
                data: null,
            });
        }

        // check for pre-existing order for past three hours
        const existingOrdersOfPastThreeHours =
            await HELPER_METHODS.getExistingOrdersOfPastThreeHours(req.body.services);
        if (
            existingOrdersOfPastThreeHours &&
            existingOrdersOfPastThreeHours.length
        ) {
            // order cannot be created
            // return error
            return res.status(405).json({
                message:
                    "Cannot update order within three hours of a pre-existing order",
                data: null,
            });
        }

        //update order
        const order = {
            datetime: req.body.datetime ? Date.parse(req.body.datetime) : Date.now(),
            totalfee: req.body.totalfee ? req.body.totalfee : 0,
            services: req.body.services,
        };
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, order, {
            upsert: true,
        });
        res.status(200).json({
            success: true,
            message: "Order Updated Successfully",
            data: updatedOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
};

/*
 * @route - DELETE api/order/:id
 * @description - delete order
 */
deleteOrder = async (req, res) => {
    try {
        // validate request
        if (!req.params || !req.params.id) {
            return res.status(400).json({
                message: "Bad Request",
                data: null,
            });
        }
        //delete order
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Order Deleted Successfully",
            data: order,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }
};

/*
 * @route - GET api/order/
 * @description - get all orders
 */
getAllOrders = async (req, res) => {
    try {
        // set skip and limit values
        let limit = 100;
        let skip = 0;
        limit = req.query.limit ? Number(req.query.limit) : limit;
        skip = req.query.skip ? Number(req.query.skip) : skip;

        //get all orders
        const orders = await Order.find().limit(limit).skip(skip);
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            data: orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            data: null,
        });
    }

}

module.exports = { createOrder, getOrder, updateOrder, deleteOrder, getAllOrders };
