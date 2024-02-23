const messages = require('../helpers/messages');
const {statusCode, statusMessages} = require('../helpers/status')

const serviceValidator = async (req, res, next) => {
    const {name} = req.body;

    if(!name && typeof(name) !== String) {
        res.status(statusCode.FAILED).send({success: false, error: {message: messages.MISSING_REQUIRED_PARAMS}});
    }
    next();
}


const orderValidator = async (req, res, next) => {
    const {totalfee, services} = req.body;

    if(!totalfee || !services) {
        res.status(statusCode.FAILED).send({success: false, error: {message: messages.MISSING_REQUIRED_PARAMS}});
    }
    next();
}

module.exports = {serviceValidator, orderValidator}; 