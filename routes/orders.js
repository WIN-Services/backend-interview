const express = require("express")
const router = express.Router();
const { validationResult, matchedData } = require('express-validator');
const ordersController = require('../controllers/orders')
const { createOrder, queryId, updateOrder } = require("../utils/validations");


router.get("/", (req, res) => ordersController.getOrders(req, res))
    .post("/", createOrder, (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => { return { message: err.msg } })
            })
        }
        return ordersController.createOrders(matchedData(req, { includeOptionals: true }), res)
    })
    .get("/:id", queryId, (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => { return { message: err.msg } })
            })
        }
        return ordersController.getOrders(req, res)
    })
    .delete("/:id", queryId, (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => { return { message: err.msg } })
            })
        }
        return ordersController.deleteOrders(req, res)
    })
    .put("/:id", updateOrder, (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => { return { message: err.msg } })
            })
        }
        return ordersController.updateOrders(matchedData(req), res)
    })


module.exports = router;