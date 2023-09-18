const { HttpError } = require('../handlers/apiResponse');
const { errors } = require('../handlers/errors');
const ServiceRecord = require('../models/ServiceRecord');

const defaultServiceRecords = [
  {
    name: 'Inspection',
    fee: 500,
  },
  {
    name: 'Testing',
    fee: 1000,
  },
  {
    name: 'Analysis',
    fee: 1500,
  },
];

/**
 * Creates default service records if none exist.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @return {Promise<void>} - a Promise that resolves when the function is complete
 */
const createDefaultServiceRecords = async (req, res) => {
  try {
    const serviceRecords = await ServiceRecord.count();

    if (!serviceRecords) {
      await ServiceRecord.insertMany(defaultServiceRecords);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Validates an array of service IDs.
 *
 * @param {Array} serviceIds - An array of service IDs to validate.
 * @return {Promise<Array>} - A promise that resolves to an array of validated service records.
 */
const validateServiceIds = async (serviceIds) => {
  const services = await ServiceRecord.find({ _id: { $in: serviceIds } });

  if (services.length !== serviceIds.length) {
    const { name, code } = errors[400];
    throw new HttpError('One or more service IDs are invalid', name, [], code);
  }

  return services;
};

module.exports = {
  createDefaultServiceRecords,
  validateServiceIds,
};
