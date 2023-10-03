// service-record.service.ts
import {Injectable} from '@nestjs/common';
import {ServiceRecord} from "../order/service-record.model";
import {InjectModel} from "@nestjs/sequelize";
import {Order} from "../order/order.model";

@Injectable()
export class ServiceRecordService {
    constructor(
        @InjectModel(ServiceRecord) private serviceRecordModel: typeof ServiceRecord,
    ) {
    }

    async getAllServices() {
        return this.serviceRecordModel.findAll();
    }

    async createService(createServiceDto: ServiceRecord) {
        return this.serviceRecordModel.create(createServiceDto);
    }
    
}
