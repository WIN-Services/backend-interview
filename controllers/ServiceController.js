const Service = require("../models/ServiceModel");

/*
 * Route - (POST) api/service
 * Usage - Creates a new service
 */
createService = async (req, res) => {
  try {
    if (!req.body || !req.body.name) {
      return res.status(400).json({
        error: "Bad Request",
      });
    }
    const service = new Service({
      name: req.body.name,
    });
    const savedService = await service.save();
    res.status(201).json({
      success: true,
      data: savedService,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

/*
 * Route - (GET) api/service/:id
 * Usage - Get a service by ID
 */
getService = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.status(400).json({
        error: "Bad Request",
      });
    }

    const service = await Service.findById(req.params.id);
    if (service == null) {
      return res.status(401).json({
        success: false,
        error: "Unable to find service",
      });
    }
    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

/*
 * Route - (GET) api/service
 * Usage - Get all services
 */
getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

/*
 * Route - (PUT) api/service/:id
 * Usage - Update a service by ID
 */
updateService = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.status(400).json({
        error: "Bad Request",
      });
    }

    const updatedService = await Service.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { name: req.body.name } },
      { new: true }
    );
    if (updatedService == null) {
      return res.status(401).json({
        success: false,
        error: "Unable to find service",
      });
    }
    res.status(200).json({
      success: true,
      data: updatedService,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

/*
 * Route - (DELETE) api/service/:id
 * Usage - Delete a service by ID
 */
deleteService = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }

    const service = await Service.findByIdAndDelete(req.params.id);
    if (service == null) {
      return res.status(401).json({
        success: false,
        error: "Unable to find service",
      });
    }
    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  getService,
  createService,
  updateService,
  deleteService,
  getAllServices,
};
