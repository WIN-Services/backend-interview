const { body, param } = require("express-validator");



const createOrder = [
    body("totalfees").exists().withMessage("totalfees is missing").custom(val => {
        const isvalid = typeof val === "number";
        if(!isvalid){
            throw new Error("totalfees must be an integer");
        }
        return true
    }).withMessage("totalfees must be an integer"),
    body("services").exists().withMessage("services is missing").isArray({min:1}).withMessage("services cannot be empty"),
    body("services.*.id").isString().withMessage("services should have key Id in it")
]

const queryId = [
    param("id").exists().withMessage("id is missing").isString()
]

const updateOrder = [
    param("id").exists().withMessage("id is missing").isString(),
    body("totalfees").optional().custom(val => {
        const isvalid = typeof val === "number";
        return isvalid
    }).withMessage("totalfees must be an integer"),
    body("services").optional().isArray({min:1}).withMessage("services cannot be empty"),
    body("services.*.id").isString().withMessage("services should have key Id in it")
]

module.exports = {
    createOrder,
    queryId,
    updateOrder
}