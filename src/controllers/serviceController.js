const Service = require('../models/Service');

// Sample in-memory data store for services (replace with a PostgreSQL database)
const services = [];

const createService = (req, res) => {
  const { id, name } = req.body;
  const newService = new Service(id, name);

  services.push(newService);
  res.status(201).json(newService);
};

const getService = (req, res) => {
  const serviceId = req.params.id;
  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return res.status(404).json({ error: 'Service not found' });
  }

  res.json(service);
};

const updateService = (req, res) => {
  const serviceId = req.params.id;
  const updatedData = req.body;
  const serviceIndex = services.findIndex((s) => s.id === serviceId);

  if (serviceIndex === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }

  // Update service data
  const updatedService = { ...services[serviceIndex], ...updatedData };
  services[serviceIndex] = updatedService;

  res.json(updatedService);
};

const deleteService = (req, res) => {
  const serviceId = req.params.id;
  const serviceIndex = services.findIndex((s) => s.id === serviceId);

  if (serviceIndex === -1) {
    return res.status(404).json({ error: 'Service not found' });
  }

  // Remove the service from the list
  services.splice(serviceIndex, 1);

  res.sendStatus(204);
};

const getAllServices = (req, res) => {
  res.json(services);
};

module.exports = {
  createService,
  getService,
  updateService,
  deleteService,
  getAllServices,
};
