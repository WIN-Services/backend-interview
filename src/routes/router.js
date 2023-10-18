const express = require("express");
const router = express.Router();
const orderControllers = require("../Controllers/orderControllers");
const serviceControllers = require("../Controllers/serviceControllers");

/**
 * GET API:
 */

router.get("/order", orderControllers.getAllOrders);
router.get("/order/:id", orderControllers.getOrdersById);
router.get("/service", serviceControllers.getAllServices);
router.get("/service/:id", serviceControllers.getServicesById);

/**
 *  POST API:
 */
router.post("/order", orderControllers.createOrders);
router.post("/service", serviceControllers.createService);

/**
 * PUT API:
 */

router.put("/order/:id", orderControllers.updateOrders);
router.put("/service/:id", serviceControllers.updateService);

/**
 * DELETE API:
 */

router.delete("/order/:id", orderControllers.deleteOrderById);
router.delete("/service/:id", serviceControllers.deleteServiceById);

module.exports=router;
