// app.module.ts
import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {ServiceRecordService} from './service-record.service';
import {ServiceRecord} from "../order/service-record.model";
import {ServiceRecordController} from "./service-record.controller";

@Module({
    imports: [SequelizeModule.forFeature([ServiceRecord])],
    controllers: [ServiceRecordController],
    providers: [ServiceRecordService],
})
export class ServiceRecordModule {
}
