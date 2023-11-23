const Service = require("../schema/serviceSchema");

const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    return res.json({
      totalService: services.length,
      services: services,
      message: "Services get Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findOne({ _id: req.params.id });
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const createServices = async (req, res) => {
  try {
    if (Object.keys(req.body).length) {
      const { name } = req.body;
      let errorMsg = "";
      if (!name?.trim()) {
        errorMsg = "Please enter service name";
      } else {
        const serviceFound = await Service.findOne({ name: name });
        if (!serviceFound) {
          const newService = new Service(req.body);
          await newService.save();
          return res.status(201).json({
            message: "Service created successfully",
            data: newService,
          });
        } else {
          errorMsg = "Service already exists";
        }
      }
      return res.status(400).json({ message: errorMsg });
    } else {
      return res.json({
        message: "Data is empty to create service",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateServiceById = async (req, res) => {
  try {
    const updatedService = await Service.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ error: "Service not found" });
    }
    return res.json({
      message: "Service updated successfully",
      data: updatedService,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteServiceById = async (req, res) => {
  try {
    const deletedService = await Service.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedService) {
      return res.status(404).json({ error: "Service not found" });
    }
    return res.json({
      message: "Service deleted successfully",
      data: deletedService,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllServices,
  getServiceById,
  createServices,
  updateServiceById,
  deleteServiceById,
};
