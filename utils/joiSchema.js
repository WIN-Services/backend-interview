const Joi = require("@hapi/joi");

const updateOrderSchema = Joi.object({
    value: Joi.number().strict().required(),
    key: Joi.string().required(),
    id: Joi.number().strict().required()
});

const serviceSchema = Joi.object({
    id: Joi.number().required()
});

const createOrderSchema = Joi.object({
    serviceId: Joi.number().strict().required(),
    totalfee: Joi.number().strict().required(),
    services: Joi.array().items(serviceSchema).required()
});


const deleteOrderSchema = Joi.object({
    id: Joi.number().strict().required()
});

const createServiceSchema = Joi.object({
    name: Joi.string().required()
});

const orderIdParamSchema = Joi.object({
    orderId: Joi.number().required()
});


module.exports = {
    updateOrderSchema: updateOrderSchema,
    createOrderSchema: createOrderSchema,
    deleteOrderSchema: deleteOrderSchema,
    createServiceSchema: createServiceSchema,
    orderIdParamSchema: orderIdParamSchema
};