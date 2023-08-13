const Joi = require('joi');

const getServiceById = {
    params: Joi.object().keys({
        serviceId: Joi.number().required()
    })
};

const createService = {
    body: Joi.object().keys({
        name: Joi.string().required(),
    })
};

const updateService = {
    params: Joi.object().keys({
        serviceId: Joi.number().required()
    }),
    body: Joi.object().keys({
        name: Joi.string().required(),
    })
};

const deleteService = {
    params: Joi.object().keys({
        serviceId: Joi.number().required()
    })
};


module.exports = {
    getServiceById,
    createService,
    updateService,
    deleteService
}