const ServiceService = require('../services/servicesService');

const serviceController = {
  createService: async (req, res) => {
    const { name: serviceName } = req.body;
    const result = await ServiceService.createService(serviceName);
    res.status(result.status).json(result);
  },

  getService: async (req, res) => {
    const serviceId = req.params.id;
    const result = await ServiceService.getServiceById(serviceId);
    res.status(result.status).json(result);
  },

  updateService: async (req, res) => {
    const serviceId = req.params.id;
    const { name: serviceName } = req.body;
    const result = await ServiceService.updateServiceById(serviceId, serviceName);
    res.status(result.status).json(result);
  },

  deleteService: async (req, res) => {
    const serviceId = req.params.id;
    const result = await ServiceService.deleteServiceById(serviceId);
    res.status(result.status).json(result);
  },

  getAllServices: async (req, res) => {
    const result = await ServiceService.getAllServices();
    res.status(result.status).json(result);
  },
};

module.exports = serviceController;
