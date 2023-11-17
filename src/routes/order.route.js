const express = require("express");
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrderById,
    deleteOrderById,
    updateOrderById
} = require("../controller/order.controller");
const Joi = require('joi');

// Define Joi schema for order validation
const orderSchema = Joi.object({
    id: Joi.string().required(),
    totalfee: Joi.number().integer().required(),
    services: Joi.array().items(Joi.string().required())
});

// Middleware for validating the request payload against the Joi schema
const validateOrder = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};


/**
 * CRUD for orders
 */
router.post("/", validateOrder(orderSchema), createOrder);
router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrderById);
router.delete("/:id", deleteOrderById);


module.exports = router;
