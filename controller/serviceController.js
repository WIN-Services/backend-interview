const Service = require("../models/serviceModel");

const serviceController = {};
// Create a new service
serviceController.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    console.log(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: "Error creating the service" });
  }
};

// Get all services
serviceController.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: "Error fetching services" });
  }
};

// Get a service by ID
serviceController.getServiceById = async (req, res) => {
  try {
    const service = await Service.findOne({id: req.params.serviceId});
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Error fetching the service" });
  }
};

// Update a service by ID
serviceController.updateService = async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate({id: req.params.serviceId}, req.body);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Error updating the service" });
  }
};

// Delete a service by ID
serviceController.deleteService = async (req, res) => {
  try {
    const service = await Service.findOneAndDelete({id: req.params.serviceId});
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting the service" });
  }
};

module.exports = serviceController;