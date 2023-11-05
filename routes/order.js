var express = require("express");
var router = express.Router();
const OrderController = require("../core/controllers/order.controller");

const API_GROUP = "/api/v1";

router.get(API_GROUP + "/order", (...args) =>
    new OrderController().get_orders(...args)
);

router.post(API_GROUP + "/order", (...args) =>
    new OrderController().create_order(...args)
);
router.delete(API_GROUP + "/order/:id", (...args) =>
    new OrderController().delete_order_by_id(...args)
);
router.get(API_GROUP + "/order/:id", (...args) =>
    new OrderController().get_order_by_id(...args)
);

router.put(API_GROUP + "/order/:id", (...args) =>
    new OrderController().update_order_by_id(...args)
);
module.exports = router;
