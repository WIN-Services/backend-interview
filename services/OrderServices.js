const order = require("../Models/order");
const service = require("../Models/service");

const moment = require("moment");

class orderServices {
  async isServiceExistsInDb(servicesArr) {
    try {
      for (let i = 0; i < servicesArr.length; i++) {
        const services = await service.findOne({
          _id: servicesArr[i].id,
        });

        if (!services) return false;
      }

      return true;
    } catch (err) {
      return false;
    }
  }

  async isValidOrder() {
    const response = await order.find().limit(1).sort({ $natural: -1 });

    const utcTime = moment.utc(response[0].datetime);
    const currentUTCtime = moment.utc();

    const utcThreeHoursAfter = utcTime.hours(utcTime.hours() + 3); // adding 3 hours to time in db.
 
    return utcThreeHoursAfter < currentUTCtime;
  }

  async createOrder(req, res) {
    try {
      if (!(await this.isValidOrder()))  // checking if order creating/ updating within 3hrs of pre existing order.
        return {
          error: true,
          message:
            "updating/creating an order within 3 hrs of a pre-existing order is not allowed",
        };

      const { totalfee = 0, services } = req.body;

      if (!(services && services.length))
        return {
          error: true,
          message: "something went wrong!",
        };
      else if (services.length > 5)
        return {
          error: true,
          message: "You cannot add more than 5 services at a time!",
        };

      if (await this.isServiceExistsInDb(services)) // Checking if services are present in Db, or are valid service Ids
        await order.create({
          totalfee,
          services,
        });
      else
        return {
          error: true,
          message: "Please add valid service ids",
        };

      return {
        error: false,
        message: "saved",
      };
    } catch (err) {
      return {
        error: true,
        message: err,
      };
    }
  }

  async getAllOrders(req, res) {
    try {
      let resp = await order.find();

      return {
        error: false,
        data: resp,
        message: "fetched",
      };
    } catch (err) {
      return {
        error: true,
        message: err,
      };
    }
  }
  async getOrder(req, res) {
    try {
      const { id: orderId } = req.body;

      let resp = await order.findOne({
        _id: orderId,
      });

      return {
        error: false,
        data: resp,
        message: "fetched",
      };
    } catch (err) {
      return {
        error: true,
        message: err,
      };
    }
  }

  async updateOrder(req, res) {
    try {
      if (!(await this.isValidOrder())) // checking if order creating/ updating within 3hrs of pre existing order.
        return {
          error: true,
          message:
            "updating/creating an order within 3 hrs of a pre-existing order is not allowed",
        };

      const { totalfee, services, id: orderId } = req.body;

      if (!(totalfee && services.length && orderId))
        return {
          error: true,
          message: "something went wrong!",
        };

      if (await this.isServiceExistsInDb(services)) {
        let resp = await order.updateOne(
          {
            _id: orderId,
          },
          { $set: { totalfee, services } }
        );

        if (resp.modifiedCount)
          return {
            error: false,
            message: "updated order",
          };
        else
          return {
            error: false,
            message: "Please do some changes",
          };
      } else
        return {
          error: true,
          message: "Please add a valid service id",
        };
    } catch (err) {
      return {
        error: true,
        message: err,
      };
    }
  }

  async deleteOrder(req, res) {
    const { id: orderId } = req.body;

    let resp = await order.deleteOne({
      _id: orderId,
    });

    if (resp.deletedCount) {
      return {
        error: false,
        message: "deleted",
      };
    } else
      return {
        error: true,
        message: "something went wrong!",
      };
  }
}

module.exports = new orderServices();
