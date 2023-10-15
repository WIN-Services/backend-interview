const express = require("express");
const route = express.Router();
const order_controller = require('./../controller/order.js');

route
    .get("/", order_controller.get_all_orders)
    .get("/:id", order_controller.get_order_by_id)
    .post("/", order_controller.add_order)
    .put("/:id", order_controller.update_order)
    .delete("/:id", order_controller.delete_order)

module.exports = route