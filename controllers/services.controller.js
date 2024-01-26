const Models = require("../models/index.js");
const Service = Models.Service;
const { sequelize } = Models;
const APP_CONSTANTS = require("../constants.js");
const SERVICE_CONSTANTS = APP_CONSTANTS.SERVICE;

// create a service
const create = async (req, res) => {
  try {
    const { name } = req.body;
    await Service.create({ name });
    res.sendStatus(201);
  } catch (e) {
    console.warn(e);
    res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG);
  }
};

// get a service by id
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const serviceInstance = await Service.findOne({ where: { id } });
    if (serviceInstance) {
      return res.status(200).send(serviceInstance);
    }
    return res.status(404).send(APP_CONSTANTS.ERRORS.NOT_FOUND);
  } catch (e) {
    console.warn(e);
    res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG);
  }
};

const getAll = async (req, res) => {
  return Service.findAll({
    attributes: [
      "name",
      [
        sequelize.fn(
          "to_char",
          sequelize.col("createdAt"),
          SERVICE_CONSTANTS.RES_DATE_FORMAT
        ),
        "created_at",
      ],
    ],
  })
    .then((services) => res.status(200).send({ services }))
    .catch((error) =>
      res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG)
    );
};

const getByName = async (req, res) => {
  const { name } = req.query;
  try {
    const service = await Service.findOne({
      where: { name },
    });

    if (service) {
      return res.status(200).send(service);
    }
    return res.status(404).send(APP_CONSTANTS.ERRORS.NOT_FOUND);
  } catch (err) {
    return res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG);
  }
};

const update = (req, res) => {
  const { id, name } = req.params;
  console.log(id, name);
  return Service.update(
    { name },
    {
      where: { id },
    }
  )
    .then((service) => res.sendStatus(200))
    .catch((error) => {
      console.warn(error);
      return res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG);
    });
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    await Service.destroy({ where: { id } });
    return res.sendStatus(204);
  } catch (error) {
    res.status(500).send(APP_CONSTANTS.ERRORS.SOMETHING_WENT_WRONG);
  }
};

module.exports = {
  getByName,
  create,
  getById,
  getAll,
  update,
  deleteById,
};
