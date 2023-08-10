import * as OrdersController from "./orders.controller.js"
import * as OrdersSchema from "./orders.validation.js"
import * as ApiV1Middleware from "../apiv1.middleware.js"

import express from "express"

const Router = express.Router()

Router.get("/test", (req, res, next) => {
    res.status(200).send("order test working")
})

Router.post("/createOrder", 
    ApiV1Middleware.validate(OrdersSchema.createOrderSchema), OrdersController.createOrder
)

Router.get("/getOrders/:user_id", OrdersController.getOrders)

Router.put("/updateOrder/:user_id/:order_id", OrdersController.updateOrder)

Router.delete("/deleteOrder/:user_id/:order_id", OrdersController.deleteOrder)

// export const OrderRoutes =  Router
export default Router