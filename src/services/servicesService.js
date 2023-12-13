const Service = require('../models/servicesModel');
const ResponseHandler = require('../lib/utils/responseHandler');

class ServiceService {
  static async createService(serviceName) {
    try {
      const newService = new Service({
        name: serviceName
      });
      await newService.save();

      return ResponseHandler.success(newService, 'Service created successfully', 201);
    } catch (error) {
      console.error('Error creating service:', error);
      return ResponseHandler.error();
    }
  }

  static async getServiceById(serviceId) {
    try {
      const service = await Service.findById(serviceId);

      if (!service) {
        return ResponseHandler.error('Service not found', 404);
      }

      return ResponseHandler.success(service);
    } catch (error) {
      console.error('Error getting service:', error);
      return ResponseHandler.error();
    }
  }

  static async updateServiceById(serviceId, serviceName) {
    try {
      const updatedServiceData = { name: serviceName };
      const updatedService = await Service.findByIdAndUpdate(serviceId, updatedServiceData, { new: true });

      if (!updatedService) {
        return ResponseHandler.error('Service not found', 404);
      }

      return ResponseHandler.success(updatedService, 'Service updated successfully');
    } catch (error) {
      console.error('Error updating service:', error);
      return ResponseHandler.error();
    }
  }

  static async deleteServiceById(serviceId) {
    try {
      const deletedService = await Service.findByIdAndDelete(serviceId);

      if (!deletedService) {
        return ResponseHandler.error('Service not found', 404);
      }

      return ResponseHandler.success(deletedService, 'Service deleted successfully');
    } catch (error) {
      console.error('Error deleting service:', error);
      return ResponseHandler.error();
    }
  }

  static async getAllServices() {
    try {
      const services = await Service.find();
      return ResponseHandler.success(services);
    } catch (error) {
      console.error('Error getting all services:', error);
      return ResponseHandler.error();
    }
  }
}

module.exports = ServiceService;
