const BaseController = require("./base.controller");
const serviceServices = require("../services/service.service");

class ServiceController extends BaseController {
  createService() {
    return this.asyncWrapper(async (req, res) => {
      const data = await serviceServices.createService(req);
      return res.status(201).json({
        status: "success",
        isSuccess: true,
        message: "Service created successfully.",
        data: data,
      });
    });
  }
  getallService() {
    return this.asyncWrapper(async (req, res) => {
        const data = await serviceServices.getallService(req);
        return res.status(200).json({
          status: "success",
          isSuccess: true,
          message: "Service listed successfully.",
          data: data,
        });
      });
  }
}

module.exports = ServiceController;
