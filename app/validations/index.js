const Joi = require("joi");

const validation = async (schemaName, data) => {
    const { error } = schemas[schemaName].validate(data);
    if (error) return new Error(error.details[0].message);

    return null;
};

const schemas = {
    Order: Joi.object({
        description: Joi.string(),
        status: Joi.valid("OPEN", "IN_PROGRESS", "COMPLETED"),
        totalFee: Joi.number().allow(0)
    }),
    Service: Joi.object({
        name: Joi.string().required().min(2).max(150),
        description: Joi.string(),
        orderId: Joi.number()
    })
};

module.exports = {
    validation
}
