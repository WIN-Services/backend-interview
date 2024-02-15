const {createOrderSchema, deleteOrderSchema, updateOrderSchema, orderIdParamSchema} = require("../utils/joiSchema");


function validateCreateOrder(req, res, next) {
    const { error } = createOrderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}


function validateDeleteOrder(req, res, next) {
    const { error } = deleteOrderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}


function validateUpdateOrder(req, res, next) {
    const { error } = updateOrderSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}


function validateOrderIdParam(req, res, next) {
    const { error } = orderIdParamSchema.validate(req.query);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}


module.exports = {
    validateCreateOrder,
    validateDeleteOrder,
    validateUpdateOrder,
    validateOrderIdParam
};