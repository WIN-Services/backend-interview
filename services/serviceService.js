const messages = require('../helpers/messages');
const {statusCode} = require('../helpers/status');
const service = require('../models/serviceModel');
const responseHandler = require('../handlers/responseHandler');


const serviceService = {
    createService: async (servicePayload) => {
        try {
            const isServiceNameAvailable = await service.findOne({name: servicePayload.name});
            
            if(isServiceNameAvailable) return responseHandler.error(messages.SERVICE_EXIST, statusCode.FAILED);

            const result = await service.create(servicePayload);
            return responseHandler.success(result, messages.SERVICE_ADDED, statusCode.SUCCESS);
        }
        catch(error) {
            console.log('Error while creating a service', error.message);
            return responseHandler.error(error.message, statusCode.FAILED);
        }
    },

    getService: async (serviceId) => {
        try {
            let serviceData = await service.findById(serviceId);
            if(!serviceData) return responseHandler.error(messages.SERVICE_NOT_EXIST, statusCode.NOT_FOUND);
    
            return  responseHandler.success(serviceData, messages.GET_SERVICE, statusCode.SUCCESS);
        } catch(error) {
            console.log('Error while getting a service ', error.message);
            return responseHandler.error(error.message, statusCode.FAILED);
        }
    },
    getAllServices: async () => {
        try {
            let serviceData = await service.find();
            if(!serviceData) return responseHandler.error(messages.SERVICE_NOT_EXIST, statusCode.NOT_FOUND);
    
            return  responseHandler.success(serviceData, messages.GET_ALL_SERVICES, statusCode.SUCCESS);
        } catch(error) {
            console.log('Error while getting all services ', error.message);
            return responseHandler.error(error.message, statusCode.FAILED);
        }
    },
    updateService: async (serviceId, servicePayload) => {
        try {
            const isServiceNameAvailable = await service.findOne({name: servicePayload.name});
            
            if(isServiceNameAvailable) return responseHandler.error(messages.SERVICE_EXIST, statusCode.FAILED);

            const result = await service.findByIdAndUpdate(serviceId, servicePayload, { new: true });
            return responseHandler.success(result, messages.SERVICE_UPDATED, statusCode.SUCCESS);
        }
        catch(error) {
            console.log('Error while updating an service ', error.message);
            return responseHandler.error(err.message, statusCode.FAILED);
        }
    },
    deleteService: async (serviceId) => {
        try {
            const result = await service.findByIdAndDelete(serviceId);
            if(!result) {
                return responseHandler.error(messages.SERVICE_NOT_EXIST, statusCode.FAILED);
            }
            return responseHandler.success(result, messages.SERVICE_DELETED, statusCode.SUCCESS);
        }
        catch(error) {
            console.log('Error while deleting service', error.message);
            return responseHandler.error(error.message, statusCode.FAILED);
        }
    },
};


module.exports = serviceService;