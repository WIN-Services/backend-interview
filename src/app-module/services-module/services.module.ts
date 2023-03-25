import { Module } from "@nestjs/common";
import { env } from "src/env";
import { JwtModule } from "@nestjs/jwt";
import { ServicesService } from "./services/services.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ServicesRepository } from "./repository/services.repository";
import { Utility } from "src/utils/utility";
import { UserModule } from "../user-module/user.module";
import { ServicesSchema } from "./entities/services.entity";
import { ServicesController } from "./controller /services.controller";
@Module({
  imports: [
    JwtModule.register({ secret: env.jwt.accessKey }),
    MongooseModule.forFeature([{ name: "Services", schema: ServicesSchema }]),
    UserModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService, ServicesRepository, Utility],
  exports: [ServicesService, ServicesRepository, Utility],
})
export class ServicesModule {}
