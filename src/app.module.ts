import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {OrderModule} from './order/order.module';
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'tnp',
            password: 'namit',
            database: 'order-service',
            autoLoadModels: true,
            synchronize: true,
        }),
        OrderModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {

}


