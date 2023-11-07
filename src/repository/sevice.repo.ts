import { Service } from "../models/service.seq.model";

export class ServiceRepo {
  async addService(info: any) {
    return new Promise<any>((res, rej) => {
      Service.create({serviceName: info.serviceName})
        .then((user: any) => {
          res(user);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async updateService(id: any, info: any) {
    return new Promise<any>((res, rej) => {
      Service.update({
        serviceName:info.serviceName
      }, { where: { id } })
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async getService(id: any) {
    return new Promise<any>((res, rej) => {
      Service.findOne({
        where: { id }
      })
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
  async getServiceList() {
    return new Promise<any>((res, rej) => {
      Service.findAll({})
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async deleteServiceById(serviceId: any) {
    return new Promise<any>((res, rej) => {
      Service.destroy({
        where: { id:serviceId },
        force:true
      })
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
}
