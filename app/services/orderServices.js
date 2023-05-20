const { Services, Orders } = require("../models");

const getAllOrderService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders = await Orders.find({});
      return orders;
    } catch (err) {
      return reject(err);
    }
  });
};

const getOneOrderService = async (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundOrder = await Orders.findById(orderId);
      resolve(foundOrder);
    } catch (err) {
      return reject(err);
    }
  });
};
const PostOrderService = async (services, totalfee) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(new Date().getTime());
      if (!services || !totalfee) {
        reject("Missing values");
      }
      const serviceIds = services.map((s) => s.id);

      const findServices = await Orders.find({
        $and: [
          { "services.id": serviceIds[0] },
          {
            order_datetime: {
              $lte: new Date(),
            },
          },
        ],
      });
      resolve(findServices);
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = {
  getAllOrderService,
  getOneOrderService,
  PostOrderService,
};
