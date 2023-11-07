import { Service } from "../models/service.seq.model";
import { Offer } from "../models/offer.seq.model";


export class OfferRepo {
  async getOfferDetailByServiceId(serviceId: any) {
    return new Promise<any>((res, rej) => {
      Offer.findOne({
        where: { serviceId },
        order: [['createdAt', 'DESC']],
      })
        .then((user: any) => {
          res(user);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async addOffer(info: any) {
    return new Promise<any>((res, rej) => {
      Offer.create({
        serviceId: info.serviceId,
        totalfee: info.totalfee
      })
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async getOffer() {
    return new Promise<any>((res, rej) => {
      Offer.findAll({
        attributes: ["id", "totalfee", "createdAt"],
        include: [{
          model: Service,
          as: "Services",
          attributes:["id", "serviceName"]
        }]
      })
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async getOfferById(id: any) {
    return new Promise<any>((res, rej) => {
      Offer.findOne({
        where: { id },
        attributes: ["id", "totalfee", "createdAt"],
        include: [{
          model: Service,
          as: "Services",
          attributes:["id", "serviceName"]
        }]
      })
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async editOffer(id: any, info: any) {
    return new Promise<any>((res, rej) => {
      Offer.update({ totalfee: info.totalfee }, { where: { id } })
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  async deleteOffer(id: any) {
    return new Promise<any>((res, rej) => {
      Offer.destroy({
        where: { id },
        force: true
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
