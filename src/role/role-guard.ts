import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role-decorators';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export enum Role {
  PUBLIC = 'public',
  USER = 'user',
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
      return true;
    }
    const request = context.switchToHttp().getRequest();
    return await this.checkRoleBasedAuthorization(requiredRoles, request);
  }

  checkRoleBasedAuthorization = async (
    roles: Role[],
    request: any,
  ): Promise<boolean> => {
    let auth_token: string =
      request.headers['Authorization'] ||
      request.headers['authorization'] ||
      request.headers['x-access-token'] ||
      '';
    if (auth_token.startsWith('Bearer')) {
      auth_token = auth_token.split(' ')[1];
    }
    const userRole = roles[0];
    switch (userRole) {
      case Role.PUBLIC:
        return true;
      case Role.USER:
        return (
          'deff1952d59f883ece260e8683fed21ab0ad9a53323eca4f' === auth_token
        );
      default:
        return false;
    }
  };
}
