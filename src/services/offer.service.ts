import { OfferRepo } from "repository/offer.repo";

export class OfferService {
  constructor(
    private readonly OfferRepo: OfferRepo
  ) { }

  async addOffer(body: any): Promise<any> {
    const offerDetails = await this.OfferRepo.getOfferDetailByServiceId(body.serviceId);
    if (!offerDetails) {
      const addOffer = await this.OfferRepo.addOffer(body);
      if (!addOffer) {
        return {
          success: false,
          status: 400,
          msg: "offer not created",
        };
      }
      return {
        success: true,
        status: 200,
        msg: "offer created successfully.",
        data: addOffer,
      };
    }
    const createdAtDate = offerDetails.createdAt;
    const createdAt = new Date(createdAtDate);
    const currentDate = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);
    if (createdAt <= threeDaysAgo) {
      const addOffer = await this.OfferRepo.addOffer(body);
      if (!addOffer) {
        return {
          success: false,
          status: 400,
          msg: "offer not created",
        };
      }
      return {
        success: true,
        status: 200,
        msg: "offer created successfully.",
        data: addOffer,
      };
    } else {
      return {
        success: false,
        status: 401,
        msg: 'The date is not 3 days before Date.now',
      };
    }
  }


  async getOffer(id:any): Promise<any> {
    const offerDetails = await this.OfferRepo.getOfferById(id);
    if (!offerDetails) {
      return {
        success: false,
        status: 404,
        msg: "offer detail not found",
      };
    }
    return {
      success: true,
      status: 200,
      msg: "offer detail .",
      data: offerDetails
    };
  }

  async getOfferList(): Promise<any> {
    const offerDetails = await this.OfferRepo.getOffer();
    if (!offerDetails) {
      return {
        success: false,
        status: 404,
        msg: "offer detail not found",
      };
    }
    return {
      success: true,
      status: 200,
      msg: "offer detail .",
      data: offerDetails
    };
  }

  async editOffer(id: any, info: any): Promise<any> {
    const offerDetails = await this.OfferRepo.getOfferById(id);
    if (!offerDetails) {
      return {
        success: false,
        status: 404,
        msg: "offer not found",
      };
    }
    const data = await this.OfferRepo.editOffer(id, info)
    if (data[0]) {
      return {
        success: true,
        status: 200,
        msg: "Offer detail update successfully.",
      };
    } else {
      return {
        success: false,
        status: 403,
        msg: "Offer detail not update.",
      };
    }
  }

  async deleteOffer(id: any): Promise<any> {
    const categoryDetails = await this.OfferRepo.getOfferById(id);
    if (!categoryDetails) {
      return {
        success: false,
        status: 404,
        msg: "offer not found",
      };
    }
    const data = await this.OfferRepo.deleteOffer(id)
    if (data === 1) {
      return {
        success: true,
        status: 200,
        msg: "Offer delete successfully .",
      };
    }
    return {
      success: false,
      status: 403,
      msg: "Offer not delete",
    };


  }

}
