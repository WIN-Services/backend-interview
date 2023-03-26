import {Module} from '@nestjs/common';
import {ServicesService} from './services/services.service';
import {ServicesController} from './controllers/services.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ServiceEntity} from "./entities/service.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ServiceEntity])],
    controllers: [ServicesController],
    providers: [ServicesService]
})
export class ServicesModule {
}
