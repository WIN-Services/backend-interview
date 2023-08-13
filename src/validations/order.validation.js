const Joi = require('joi');

const getOrderById = {
    params: Joi.object().keys({
        orderId: Joi.number().required()
    })
};

const createOrder = {
    body: Joi.object().keys({
        date_time: Joi.date().iso().required(),
        total_fee: Joi.number().min(0).required().strict(),
        service_ids: Joi.array().items(Joi.number().integer()).unique().min(1).required(),
    })
};

const updateOrder = {
    params: Joi.object().keys({
        orderId: Joi.number().required()
    }),
    body: Joi.object().keys({
        date_time: Joi.date().iso(),
        total_fee: Joi.number().min(0).strict(),
    })
};

const deleteOrder = {
    params: Joi.object().keys({
        orderId: Joi.number().required()
    })
};


module.exports = {
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}