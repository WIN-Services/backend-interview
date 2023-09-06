import {
    Injectable,
    CanActivate,
    ExecutionContext,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { ROLES_KEY } from './role-decorators';
  import { Configs } from '../config/config';
  import { HttpError } from '../errors/custom.errors';
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axios = require('axios');
  
  export enum Role {
    PLATFORM_USER = 'platform_user',
    PUBLIC = 'public',
    ADMIN = 'admin',
  }
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
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
      const auth_token =
        request.headers['Authorization'] ||
        request.headers['authorization'] ||
        request.headers['x-access-token'];
      const userRole = roles[0];
      switch (userRole) {
        case Role.PUBLIC:
          return true;
        case Role.PLATFORM_USER:
          this.logger.debug(`Validating role for platform user.`);
          if (!auth_token) {
            throw HttpError(HttpStatus.UNAUTHORIZED, 'Unauthorized user!');
          }
          // TODO : Add logic for auth.
          return true;
        case Role.ADMIN:
          if (!Configs().oms_secret_key) {
            throw HttpError(HttpStatus.UNAUTHORIZED, 'Unauthorised user.');
          }
          return Configs().oms_secret_key?.toString() === auth_token;
        default:
          return false;
      }
    };
  }