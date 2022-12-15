import { ServiceRecord } from "../../models/service-record.model";

class ServiceRecordService {

  static getInstance(): ServiceRecordService {
    return new ServiceRecordService;
  }

  async show(serviceId: number): Promise<ServiceRecord> {
    return ServiceRecord.findOne({
      where: {
        id: serviceId
      }
    })
  }
}

export const serviceRecordService = ServiceRecordService.getInstance();