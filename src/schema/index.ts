import joi from 'joi';

export const createOrderSchema = joi.object().keys({ service_ids: joi.array().items(joi.number().required()) });

export const orderIdParams = joi.object().keys({ order_id: joi.number().required() });

export const serviceIdParams = joi.object().keys({ service_id: joi.number().required() });
