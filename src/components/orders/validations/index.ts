import logger from '../../../config/logger';
import Joi from 'joi'



export const createOrderValidation = async (data: object) => {
    logger.info('Inside create Order Validation')
    const orderSchema = Joi.object({
        totalfee: Joi.number().required(),
        services: Joi.array().items(
            Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid Service ID format').required()
        ).required(),
    });

    const validate = orderSchema.validate(data);

    let error = false
    let message = ''
    if (validate.error) {
        message = validate.error.details[0].message
        message = message.replace(/"/g, '')
        error = true
    }
    return { error, message }
}

export const updateOrderValidation = async (data: object) => {
    logger.info('Inside updateOrderValidation')
    const Schema = Joi.object({
        totalfee: Joi.number().optional().messages({
            'number.base': 'Total fee must be a number',
        }),
        services: Joi.array().items(
            Joi.string().regex(/^[0-9a-fA-F]{24}$/).message('Invalid Service ID format').required()
        ).optional().messages({
            'any.required': 'Services array is required',
            'array.base': 'Services must be an array',
        }),
    })
    const validate = Schema.validate(data)
    let error = false
    let message = ''
    if (validate.error) {
        message = validate.error.details[0].message
        message = message.replace(/"/g, '')
        error = true
    }
    return { error, message }
}
