import * as UserController from "./users.controller.js"
import * as UserSchema from "./users.validation.js"
import * as ApiV1Middleware from "../apiv1.middleware.js"

import express from "express"

const Router = express.Router()

Router.get("/test", (err, req, res, next) => {
    res.status(200).send("user test working")
})

Router.post("/createUser", 
    ApiV1Middleware.validate(UserSchema.createUserSchema), UserController.createUser
)

// export const OrderRoutes =  Router
export default Router