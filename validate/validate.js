const Joi = require('joi')

const servicesVal =Joi.object({
      
    services: Joi.array().items(joi.number()).required()

});


module.exports = {
    servicesVal
}