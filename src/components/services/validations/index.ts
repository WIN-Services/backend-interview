import logger from '../../../config/logger';
import Joi from 'joi'

export const createServiceValidation = async (data: object) => {
    logger.info('Inside create Service Validation');
    const serviceSchema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
    });

    const validate = serviceSchema.validate(data);

    let error = false;
    let message = '';
    if (validate.error) {
        message = validate.error.details[0].message;
        message = message.replace(/"/g, '');
        error = true;
    }
    return { error, message };
};
