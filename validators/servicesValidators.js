const { body, param } = require("express-validator");

const serviceBodyInput = [
    body('name', "Name is required").not().isEmpty(),
    body('serviceCode', "Service Code is required").not().isEmpty(),
    body('cost', "Cost of service is required.").isNumeric()
]

exports.serviceBodyInput = serviceBodyInput;