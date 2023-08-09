const Order = require("../models/order");
const Service = require("../models/service");

module.exports = {
  createService: async (req, res) => {
    try {
      // get body data
      const { name } = req.body;

      //   database entry for Service
      const newService = await Service.create({
        name,
      });

      //   success response
      res.status(201).json(newService);
    } catch (error) {
      // error
      res.status(500).json({
        message: "Internal Server Error",
        error: error.toString(),
      });
    }
  },
};
