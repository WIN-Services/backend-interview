const orederController = require('./../controller/order-controller')

module.exports = (router) => {
    router.route('/orders')
        .get(orederController.getAllOrders);

    router.route('/order')
        .post(orederController.createOrder)
        .put(orederController.updateOrder)
        .delete(orederController.deleteOrder)

    router.route('/order/:order_id')
        .get(orederController.getThisOrder)

    return router
};