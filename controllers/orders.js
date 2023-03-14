const { response } = require("../config/response");
const {
    getAllOrdersDB,
    getOrderByIdDB,
    createOrderDB,
    updateOrderDB,
    deleteOrderDB
} = require("../controllers/dbController");
const moment = require('moment');

const getAllOrders = async (req, res) => {
    try {
        console.log("getAllOrders called");
        const orders = await getAllOrdersDB();
        if (!orders || !orders.length) throw "no orders found";
        response(200, "data fetched successfully", orders, res);
    } catch (err) {
        if (err.message) err = err.message;
        console.log("getAllOrders error", err);
        response(500, err || "failed to fetch data", {}, res);
    }
}

const getOrderById = async (req, res) => {
    try {
        const requestParam = req.params;
        console.log("getOrderById requestParam", requestParam);
        const orderId = requestParam.id;
        console.log("orderId", orderId);
        const order = await getOrderByIdDB(orderId);
        console.log(order);
        if (!order || !order.length) throw "no order found for this Id";
        response(200, "data fetched successfully", order, res);
    } catch (err) {
        if (err.message) err = err.message;
        console.log("getOrderById error", err);
        response(500, err || "failed to fetch data", {}, res);
    }
}

const createOrder = async (req, res) => {
    try {
        const requestBody = req.body;
        console.log("createOrder requestBody", requestBody);
        const {
            totalfee,
            services
        } = requestBody;
        const createdAt = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(createdAt);
        const order = await createOrderDB(totalfee, services, createdAt);
        if (!order || !order.length) throw "failed to create order";
        response(201, "order created successfully", order, res);
    } catch (err) {
        if (err.message) err = err.message;
        console.log("createOrder error", err);
        response(500, err || "failed to create order", {}, res);
    }
}

const updateOrder = async (req, res) => {
    try {
        const requestParam = req.params;
        console.log("updateOrder requestParam", requestParam);
        const orderId = requestParam.id;
        console.log("orderId", orderId);
        const requestBody = req.body;
        console.log(requestBody);
        const {
            totalfee,
            services
        } = requestBody;
        const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss');
        console.log(updatedAt);
        const order = await updateOrderDB(orderId, totalfee, services, updatedAt);
        if (!order || !order.length) throw "failed to update order";
        response(201, "order created successfully", order, res);
    } catch (err) {
        if (err.message) err = err.message;
        console.log("updateOrder error", err);
        response(500, "failed to update order", {}, res);
    }
}

const deleteOrder = async (req, res) => {
    try {
        const requestParam = req.params;
        console.log("deleteOrder requestParam", requestParam);
        const orderId = requestParam.id;
        const order = await deleteOrderDB(orderId);
        console.log("orderId", orderId);
        response(200, "data deleted successfully", {}, res);
    } catch (err) {
        if (err.message) err = err.message;
        console.log("deleteOrder error", err);
        response(500, err || "failed to delete order", {}, res);
    }
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    getAllOrders,
    getOrderById
}