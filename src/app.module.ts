import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { winstonOptions } from './libs/logger/logger';
import { OrderModule } from './app-module/order-module/order.module';
import { UserModule } from './app-module/user-module/user.module';
import { AccessTokenGuard } from './common/guards';
import { postGresConfig } from './database/typeorm.config';
import { ServicesModule } from './app-module/services-module/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    WinstonModule.forRoot(winstonOptions),
    UserModule,
    OrderModule,
    ServicesModule,
    TypeOrmModule.forRoot(postGresConfig),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    AppService,
  ],
})
export class AppModule {}
