const { Services, Orders } = require("../models");
const timeDifference = (date1, date2) => {
  return Math.abs((date1.getTime() - date2.getTime()) / 3600000);
};
const getAllOrderService = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let orders = await Orders.find({});
      resolve(orders);
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
const postOrderService = async (services, totalfee) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!services || !totalfee) {
        return reject("Missing values");
      }
      const serviceIds = services.map((s) => s.id);

      const findExisitingOrder = await Orders.findOne({
        $and: [
          { "services.id": serviceIds[0] },
          {
            status: "INCOMPLETE",
          },
        ],
      }).sort({ updatedAt: -1 });
      if(!findExisitingOrder){
        resolve("No order found")
      }
      const timeDiff = timeDifference(
        new Date(),
        findExisitingOrder?.order_datetime
      );
      if (timeDiff <= 3) {
        resolve("order_exists");
      } else {
        let createObj = {
          order_datetime: new Date(),
          services: services,
          totalfee: totalfee,
          status: "INCOMPLETE",
        };
        resolve(await Orders.create(createObj));
      }
    } catch (err) {
      return reject(err);
    }
  });
};
const updateOrderService = async (services, orderId,status) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!orderId) {
        return reject("Missing values");
      }
      const findExisitingOrder = await Orders.findOne({
        $and: [
          {
            _id: orderId,
          },
          {
            status: "INCOMPLETE",
          },
        ],
      }).sort({ updatedAt: -1 });
      if(!findExisitingOrder){
        resolve("No order found")
      }
      const timeDiff = timeDifference(
        new Date(),
        findExisitingOrder?.order_datetime
      );
      if (timeDiff <= 3) {
        resolve("order_exists");
      } else {

        let updateObj = status ? {
          status: status,
        }: {
          services: services,
        };
        let filter = { _id: orderId };
        resolve(await Orders.findOneAndUpdate(filter, updateObj));
      }
    } catch (err) {
      return reject(err);
    }
  });
};
const deleteOrderService = async (orderId) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Orders.deleteOne({ _id: orderId });
      resolve("order deleted");
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports = {
  getAllOrderService,
  getOneOrderService,
  postOrderService,
  updateOrderService,
  deleteOrderService,
};
