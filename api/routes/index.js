const { order, service } = require("../handlers");
const middlewares = require("../middlewares");

const attach = (app) => {
    app.get("/order/:orderId", order.getOrder);
    app.get("/orders", order.getAllOrders);
    app.post("/order", middlewares.validateCreateOrder, order.createOrder);
    app.put("/order", middlewares.validateUpdateOrder, middlewares.validateCreateOrder, order.updateOrder);
    app.delete("/order/:orderId", order.deleteOrder);
    app.get("/services",  service.getAllServices);
    app.post("/service", middlewares.validateCreateService, service.createService);
}

module.exports = {
    attach
}