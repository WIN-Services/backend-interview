import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {OrderModule} from './order/order.module';
import {SequelizeModule} from "@nestjs/sequelize";
import {sequelizeConfig} from "./sequelize.config";
import {ServiceRecordModule} from "./service-record/service-record.module";

@Module({
    imports: [
        SequelizeModule.forRoot({
            ...sequelizeConfig
        }),
        OrderModule,
        ServiceRecordModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}


