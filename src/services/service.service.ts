import { ServiceRepo } from "repository/sevice.repo";

export class ServiceService {
  constructor(
    private readonly serviceRepo: ServiceRepo
  ) { }

  async addService(body: any): Promise<any> {
    const service = await this.serviceRepo.addService(body);
    if (!service) {
      return {
        success: false,
        status: 400,
        msg: "service not added",
      };
    }
    return {
      success: true,
      status: 200,
      msg: "service added successfully.",
      data: service
    };
  }


  async getService(id: any): Promise<any> {
    const serviceDetails = await this.serviceRepo.getService(id);
    if (serviceDetails.length === 0) {
      return {
        success: false,
        status: 404,
        msg: "service Details  not found",
      };
    }
    return {
      success: true,
      status: 200,
      msg: "Getting service Details.",
      data: serviceDetails
    };
  }

  async allServiceList(): Promise<any> {
    const serviceDetails = await this.serviceRepo.getServiceList();
    if (serviceDetails.length === 0) {
      return {
        success: false,
        status: 404,
        msg: "service list Details  not found",
      };
    }
    return {
      success: true,
      status: 200,
      msg: "Getting service list successfully.",
      data: serviceDetails
    };
  }

  async deleteService(serviceId: any): Promise<any> {
    const serviceDetails = await this.serviceRepo.deleteServiceById(serviceId);
      if (serviceDetails === 1) {
        return {
          success: true,
          status: 200,
          msg: "service delete successfully .",
        };
      }
      return {
        success: false,
        status: 403,
        msg: "service not delete",
      };
    }
  

  async updateService(serviceId: any, info: any): Promise<any> {
      const serviceDetails = await this.serviceRepo.updateService(serviceId,info);
      if (serviceDetails) {
        return {
          success: true,
          status: 200,
          msg: "service name updated successfully",
        };
      }
      return {
        success: false,
        status: 404,
        msg: "service name not updated",
      };
    }
}
