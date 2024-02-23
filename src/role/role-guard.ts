/* eslint-disable prettier/prettier */
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Logger,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role-decorators';
import { Configs } from '../config/config';
import { HttpError } from '../errors/custom.errors';
import { JwtService } from '@nestjs/jwt';

export enum Role {
  CUSTOMER = 'customer',
  PUBLIC = 'public',
  ADMIN = 'admin',
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) { }
  private readonly logger = new Logger(RolesGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();
    return await this.checkRoleBasedAuthorization(requiredRoles, request);
  }

  checkRoleBasedAuthorization = async (
    roles: Role[],
    request: any,
  ): Promise<boolean> => {
    let auth_token;
    const userRole = roles[0];
    let token;

    switch (userRole) {
      case Role.PUBLIC:
        return true;
      case Role.ADMIN:
        auth_token =
          request.headers['Authorization'] ||
          request.headers['authorization'];
        if (!auth_token) {
          throw HttpError(HttpStatus.UNAUTHORIZED, 'Unauthorized user!');
        }
        token = auth_token.replace("Bearer ", "");

        if (!Configs().admin_secret_key) {
          throw HttpError(
            HttpStatus.UNAUTHORIZED,
            'environment config errors!',
          );
        }
        return Configs().admin_secret_key?.toString() === token;
      case Role.CUSTOMER:
        this.logger.debug(`Validating role if CUSTOMER`);
        auth_token =
          request.headers['Authorization'] ||
          request.headers['authorization'];
        if (!auth_token) {
          throw HttpError(HttpStatus.UNAUTHORIZED, 'Unauthorized customer!');
        }
        token = auth_token.replace("Bearer ", "");

        try {
          await this.jwtService.verify(token, {
            secret: Configs().jwt.secret,
          });
          return true;
        } catch (e) {
          this.logger.error(`${e}`);
          throw HttpError(HttpStatus.UNAUTHORIZED, 'Unauthorized customer!!');
        }
      default:
        return false;
    }
  };
}
