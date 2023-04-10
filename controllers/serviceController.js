import ServiceDao from "../DBServices/serviceDao.js";

const serviceDao = new ServiceDao();

class ServiceController {
  constructor() {}

  async createService(req, res) {
    try {
      if (!req.body.name) {
        throw "form body is not as expected";
      }
      const data = {
        name: req.body.name,
      };
      const newService = await serviceDao.createService(data);
      return res
        .status(201)
        .json({ message: "success", status: "created", data: newService });
    } catch (err) {
      return res.status(500).json({
        message: "failure",
        status: "not created",
        data: { error: err },
      });
    }
  }

  async fetchAllServices(req, res) {
    try {
      const services = await serviceDao.fetchAllServices();
      return res
        .status(200)
        .json({ message: "success", status: "ok", data: services });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "failure", status: "not ok", data: { error: err } });
    }
  }

  async getService(req, res) {
    try {
      const { id: serviceId } = req.params;
      const service = await serviceDao.fetchService(serviceId);
      return res
        .status(200)
        .json({ message: "success", status: "ok", data: service });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "failure", status: "not ok", data: { error: err } });
    }
  }

  async destroyService(req, res) {
    try {
      const { id: serviceId } = req.params;
      const service = await serviceDao.fetchService(serviceId);
      if (!service) {
        throw "service does not exist";
      }
      return res
        .status(200)
        .json({ message: "success", status: "deleted", data: service });
    } catch (err) {
      return res.status(500).json({
        message: "success",
        status: "not deleted",
        data: { error: err },
      });
    }
  }
}

export default ServiceController;
