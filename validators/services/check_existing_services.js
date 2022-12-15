const Service = require("../../models/service");

//Checks if the service already exists or not
const checkIfServiceExists = async (req, res, next) => {
  try {
    let query = { _id: { $in: req.body.services } };
    let services = await Service.find(query);
    if (services.length != req.body.services.length) {
        return res.status(404).json({
            error: "Services not found",
          });
    }
   next()
  } catch (error) {
    console.log(error);
    return res.status(404).json({
        error: "Services not found",
      });
  }
};

module.exports = { checkIfServiceExists };