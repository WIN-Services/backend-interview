const services = require("../../model/services.model")
const { success, error } = require("../../common/res.common")
const { messages, http_codes } = require("../../constants/text.constant")
const Joi = require("joi")
const utcTime = require("../../common/cTime.common")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId

const updateService = async (req, res) => {
    try {
        const bodyData = (req || {}).body || {};
        const schema = Joi.object({
            serviceId: Joi.string().required(),
            is_active: Joi.boolean(),
            fees: Joi.number()
        });
        const schemaValidator = schema.validate(bodyData)
        if (schemaValidator.error) {
            return error(http_codes.badRequest, schemaValidator.error.message || messages.badRequest, res)
        }
        const filter = { _id: new ObjectId(req.body.serviceId) }
        const updates = {
            updated_At: utcTime()
        }
        const isExist = await services.findOne(filter)
        if (!isExist) {
            return error(http_codes.notFound, messages.serviceIsAlreadyPresent, res)
        }
        if(req.body.is_active){
           updates["is_active"]= req?.body?.is_active
        }
        if(req.body.fees){
            updates["fees"]= Number(req?.body?.fees)
         }
        const updateService = await services.findOneAndUpdate(filter, updates, { new: true })
        // console.log(updateService)
        if (updateService) {
            return success(http_codes.ok, messages.serviceUpdatedSuccessfully, { serviceDetails: updateService }, res)
        } else {
            return error(http_codes.internalError, messages.internalServerError, res)
        }
    } catch (e) {
        console.log("error : ", e)
        return error(http_codes.internalError, messages.internalServerError, res)
    }
}

module.exports = updateService