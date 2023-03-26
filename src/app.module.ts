import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {OrdersModule} from './orders/orders.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ServicesModule} from './services/services.module';
import * as process from "process";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: parseInt(<string>process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            autoLoadEntities: true,
            synchronize: true,
        }), OrdersModule, ServicesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
