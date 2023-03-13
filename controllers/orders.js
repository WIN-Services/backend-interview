const { response } = require("../config/response");
const {
    getAllOrdersDB,
    getOrderByIdDB
} = require("../controllers/dbController");

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



module.exports = {
    getAllOrders,
    getOrderById
}