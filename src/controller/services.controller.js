const Service = require("../models/services.entity");


const createServices = async (req, res) => {
  try {
    const {id} = req.body.id
    const existingServices = await Service.findOne({ id: id });
    if (existingServices)
      return res.status(400).json({ error: "Services already exists!" });
    const services = new Service(req.body);
    await services.save();
    res.status(201).json(services);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


/**
 *  Gets services by id
 */
const getServicesById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ error: "service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get all Services
 */
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Updates services By id
 */
const updateServicesById = async (req, res) => {
  const { id } = req.params;
  try {
    const existingService = await Service.findOne({ _id: id });
    if (!existingService) {
      return res.status(404).json({
        error: "Service not found ",
      });
    }
    const services = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!services) {
      return res.status(404).json({ error: "services not found" });
    }
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/**
 * Deletes Service By id
 */
const deleteServicesById = async (req, res) => {
  try {
    const { id } = req.params;
    const services = await Service.findByIdAndDelete(id);
    if (!services) {
      return res.status(404).json({ error: "services not found" });
    }
    res.json({ message: "services deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllServices,
  getServicesById,
  createServices,
  updateServicesById,
  deleteServicesById,
};

