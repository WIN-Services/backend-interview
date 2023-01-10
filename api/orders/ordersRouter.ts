import express, { Router } from "express";
import * as orderController from "./orderController";
import { createOrderValidation, validateCreateOrder } from "./orderValidator";


const orderRouter: Router = express.Router()


orderRouter.get('/id/:orderId', orderController.getOrder)

orderRouter.get('/getAll', orderController.getOrders)

orderRouter.post('/create', validateCreateOrder, createOrderValidation, orderController.createOrder)

orderRouter.put('/update/:orderId', orderController.updateOrder)

orderRouter.delete('/delete/:orderId', orderController.deleteOrder)

export default orderRouter
