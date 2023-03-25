import { Module } from "@nestjs/common";
import { APP_GUARD, RouterModule } from "@nestjs/core";
import { WinstonModule } from "nest-winston";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { winstonOptions } from "./libs/logger/logger";
import { BaseModule } from "./app-module/base/base.module";
import { OrderModule } from "./app-module/order-module/order.module";
import { UserModule } from "./app-module/user-module/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AccessTokenGuard } from "./common/guards";
import { mongoConfig } from "./database/typeorm.config";
import { ServicesModule } from "./app-module/services-module/services.module";
@Module({
  imports: [
    MongooseModule.forRoot(mongoConfig),
    WinstonModule.forRoot(winstonOptions),
    RouterModule.register([
      {
        path: "/user",
        module: UserModule,
      },
      {
        path: "/order",
        module: OrderModule,
      },
      {
        path: "/services",
        module: ServicesModule,
      },
    ]),
    UserModule,
    OrderModule,
    ServicesModule,
    BaseModule,
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
