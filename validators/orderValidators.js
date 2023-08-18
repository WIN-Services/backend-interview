const { body, param } = require("express-validator");

const orderBodyInput = [
    body('services', "Atleast one category is required.").isArray({ min: 1 })
        .custom(value => new Set(value).size === value.length).withMessage('Array must contain unique values'),
    body('services.*').isInt()
]

const orderIdParam = param('id', "Invalid Id").isInt();

exports.orderBodyInput = orderBodyInput;
exports.orderIdParam = orderIdParam;