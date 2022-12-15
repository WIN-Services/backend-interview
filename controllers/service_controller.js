const Service = require("../models/service");

exports.createService = async (req, res) => {
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

exports.getService = async (req, res) => {
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


exports.getAllServices = async (req, res) => {
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


exports.updateService = async (req, res) => {
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


exports.deleteService = async (req, res) => {
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