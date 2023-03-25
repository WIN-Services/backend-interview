import { Module } from '@nestjs/common';
import { env } from 'src/env';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controller/user.controller';
import { AuthController } from './controller/auth.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';
import { Utility } from 'src/utils/utility';
@Module({
  imports: [JwtModule.register({ secret: env.jwt.accessKey })],
  controllers: [UserController, AuthController],
  providers: [UserService, UserRepository, Utility],
  exports: [UserService, UserRepository],
})
export class UserModule {}
