import { Module } from "@nestjs/common";
import { env } from "src/env";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "./controller/user.controller";
import { AuthController } from "./controller/auth.controller";
import { UserRepository } from "./repositories/user.repository";
import { UserService } from "./services/user.service";
import { BaseModule } from "../base/base.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./entities/user.entity";
import { Utility } from "src/utils/utility";
@Module({
  imports: [
    JwtModule.register({ secret: env.jwt.accessKey }),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    BaseModule,
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, UserRepository, Utility],
  exports: [UserService, UserRepository],
})
export class UserModule {}
