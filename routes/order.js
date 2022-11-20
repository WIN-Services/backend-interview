const orderController = require('../controllers/order');

module.exports = (router) => {
    router.get('/', orderController.list);
    router.post('/', orderController.create);
    router.get('/:orderID', orderController.getAnOrderDetails);
    router.delete('/', orderController.remove);
    router.put('/', orderController.update);
    return router;
};
