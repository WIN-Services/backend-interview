import Service from "../models/service.js";

class ServiceDao {
  async createService(data) {
    return new Promise((resolve, reject) => {
      Service.create(data)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  async fetchService(serviceId) {
    return new Promise((resolve, reject) => {
      Service.findOne({ _id: serviceId })
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  async fetchAllServices(filter = {}, skip = 0, limit = 0) {
    return new Promise(async (resolve, reject) => {
      try {
        const allServices = await Service.find(filter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit);

        resolve(allServices);
      } catch (error) {
        reject(error);
      }
    });
  }

  async destroyService(serviceId) {
    return new Promise((resolve, reject) => {
      Service.findOneAndDelete({ _id: serviceId })
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  async updateService(serviceId, data) {
    return new Promise((resolve, reject) => {
      Service.findOneAndUpdate({ _id: serviceId }, { $set: data })
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}

export default ServiceDao;
