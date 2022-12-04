'use strict'

const express = require('express')
const router = express.Router();
var bodyParser = require('body-parser')    
var jsonParser = bodyParser.json();
//const { validateFib } = require('../validator')
const { createOrder, updateOrder, getOrderById, getAllOrders, cancelOrder, requestService, getAllServicesByOrderId } = require('../controller/controller')
router.use(bodyParser.urlencoded({ extended: false }));


router.get("/health", function (req, res) {
  res.status(200).send({ status: 'OK' });
})

router.post("/createOrder",jsonParser, function (req, res) {
    createOrder(req,res)
})

router.post("/updateOrder",jsonParser, function (req, res) {
    updateOrder(req,res)
})

router.get("/getOrderById/:id", jsonParser, function (req, res){
    getOrderById(req,res)
})

router.get("/getAllOrders", jsonParser, function (req, res){
    getAllOrders(req, res)
})

router.delete("/cancelOrder/:id", jsonParser, function (req, res){
    cancelOrder(req, res)
})

router.post("/requestService/:id", jsonParser, function (req, res){
    requestService(req, res)
})

router.get("/getAllServicesByOrderId/:id", jsonParser, function (req, res){
    getAllServicesByOrderId(req, res)
})


module.exports = router