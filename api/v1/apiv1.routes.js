import express from "express"

const Router = express.Router()

// import { OrderRoutes } from "./orders/orders.routes.js"
import OrderRoutes from "./orders/orders.routes.js"
import ServiceRoutes from "./services/services.routes.js"
import UserRoutes from "./users/users.routes.js"

Router.use("/orders", OrderRoutes)
Router.use("/services", ServiceRoutes)
Router.use("/users", UserRoutes)

export default Router