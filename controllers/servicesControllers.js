const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');
const { Service } = require('../models/index');

const getAllServices = async (req, res, next) => {
    try {
        const allServices = await Service.findAll();
        return res.status(200).json({ services: allServices });
    } catch (e) {
        return next(new HttpError("Something went wrong! while getting all available services", 500));
    }
}

const createNewService = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid Inputs, Please check again!!', 422));
    }

    const { name, serviceCode, cost } = req.body;

    try {
        const existingService = await Service.findOne({where: {serviceCode: serviceCode}});
        console.log(existingService);
        if(!!existingService) {
            return next( new HttpError("Service already exists with the provided service code.", 409) );
        }

        const newService = await Service.create({
            name,
            serviceCode,
            cost
        });

        return res.status(201).json({ service: newService });
    } catch (e) {
        console.log(e);
        return next(new HttpError("Something Went Wrong! Couldn't create new service.", 500));
    }


}

module.exports.getAllServices = getAllServices;
module.exports.createNewService = createNewService;