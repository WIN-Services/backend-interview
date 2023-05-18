require("dotenv").config();
const { dbConnection } = require("../../config/db");
dbConnection();
const logger = require("../utils/logger");

const { Services, Orders } = require("../models/index");

const addServiceDataInDB = async () => {
  try {
    await Services.insertMany([
      { sv_id: "123", name: "Inspection", status: "ON" },
      { sv_id: "789", name: "Testing", status: "ON" },
      { sv_id: "456", name: "Analysis", status: "ON" },
      { sv_id: "101", name: "Interior", status: "ON" },
      { sv_id: "102", name: "Painting", status: "ON" },
    ]);
    logger.info("servicesInsert");
  } catch (error) {
    logger.error(error);
  }
};

const addOrderInDB = async () => {
  try {
    await Orders.insertMany([
      {
        order_datetime: "2022-11-01T11:11:11.111Z",
        services: [
          {
            id: "123",
          },
        ],
        totalfee: "100",
        status: "INCOMPLETE",
      },
      {
        order_datetime: "2022-11-01T11:11:11.111Z",
        services: [
          {
            id: "789",
          },
        ],
        totalfee: "200",
        status: "INCOMPLETE",
      },
      {
        order_datetime: "2022-11-01T11:11:11.111Z",
        services: [
          {
            id: "456",
          },
        ],
        totalfee: "300",
        status: "INCOMPLETE",
      },
    ]);
    logger.info("OrderInsert");
  } catch (error) {
    logger.error(error);
  } finally {
    process.exit(1);
  }
};
Promise.all([addServiceDataInDB(), addOrderInDB()]);
