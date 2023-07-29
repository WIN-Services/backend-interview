const { Services } = require('../../db/models');
const {
  errorMessage,
  BadRequestError,
  ServerError,
  NotFoundError
} = require('../../helpers');

const serviceController = {
  async addService(reqBody) {
    const { name } = reqBody;
    if (!name) {
      throw new BadRequestError(errorMessage.NAME_REQUIRED);
    }
    try {
      let service = { name };
      service = await Services.create(service);
      return service;
    } catch (err) {
      console.error(err);
      throw new ServerError(errorMessage.COMMON_ERROR);
    }
  },

  async updateService(serviceId, reqBody) {
    const { name } = reqBody;
    const service = await Services.findByPk(serviceId);
    if (!service) {
      throw new NotFoundError(errorMessage.SERVICE_NOT_FOUND);
    }
    if (name) {
      service.name = name;
      await service.save();
    }
    return service;
  },

  async getServices() {
    const services = await Services.findAll();
    return services;
  },

  async getServiceById(serviceId) {
    const service = await Services.findByPk(serviceId);
    if (!service) {
      throw new NotFoundError(errorMessage.SERVICE_NOT_FOUND);
    }
    return service;
  },

  async deleteServiceById(serviceId) {
    const service = await Services.findByPk(serviceId);
    if (!service) {
      throw new NotFoundError(errorMessage.SERVICE_NOT_FOUND);
    }
    await service.destroy();
    return { success: true };
  }
};

module.exports = serviceController;
