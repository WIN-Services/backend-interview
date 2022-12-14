const Service = require("../models/ServiceModel");

//Checks if the service already exists or not
checkIfServiceExists = async (serviceIds) => {
  try {
    let query = { _id: { $in: serviceIds } };
    let services = await Service.find(query);
    if (services.length != serviceIds.length) {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = { checkIfServiceExists };
