const services = require("../../model/services.model")
const { success, error } = require("../../common/res.common")
const { messages, http_codes } = require("../../constants/text.constant")
const Joi = require("joi")

const createService = async (req, res) => {
    try {
        const bodyData = (req || {}).body || {};
        const schema = Joi.object({
            name: Joi.string().required().strict(),
            fees: Joi.number().required().strict(),
            is_active: Joi.boolean()
        });
        const schemaValidator = schema.validate(bodyData)
        if (schemaValidator.error) {
            return error(http_codes.badRequest, schemaValidator.error.message || messages.badRequest, res)
        }
        const isExist = await services.findOne({ name: req.body.name })
        if (isExist) {
            return error(http_codes.badRequest, messages.serviceIsAlreadyPresent, res)
        }
        const newService = await services.create(bodyData)

        if (newService) {
            return success(http_codes.created, messages.serviceCreatedSuccessfully, { serviceDetails: newService }, res)
        } else {
            return error(http_codes.internalError, messages.internalServerError, res)
        }
    } catch (e) {
        console.log("error : ", e)
        return error(http_codes.internalError, messages.internalServerError, res)
    }
}
module.exports = createService