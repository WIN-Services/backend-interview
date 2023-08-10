import * as ServiceController from "./services.controller.js"
import * as ServiceSchema from "./services.validation.js"
import * as ApiV1Middleware from "../apiv1.middleware.js"

import express from "express"

const Router = express.Router()

Router.get("/test", (req, res, next) => {
    res.status(200).send("service test working")
})

Router.post("/createService", 
    ApiV1Middleware.validate(ServiceSchema.createServiceSchema), ServiceController.createService
)

Router.get("/getServices", ServiceController.getServices)

// Router.put("/updateService", ServiceController.updateService)

// export const OrderRoutes =  Router
export default Router