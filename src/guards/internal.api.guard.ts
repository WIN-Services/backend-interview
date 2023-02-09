/* eslint-disable no-prototype-builtins */
'use strict';

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

/**
 * InternalApiGuard
 * @export
 * @class InternalApiGuard
 * @implements {CanActivate}
 */
@Injectable()
export class InternalApiGuard implements CanActivate {
  /**
   * constructor
   * Creates an instance of InternalApiGuard.
   * @param {Reflector} _reflector
   * @memberof InternalApiGuard
   */
  constructor(private readonly _reflector: Reflector) {}

  /**
   * canActivate
   * @param {ExecutionContext} context
   * @return {*}  {boolean}
   * @memberof InternalApiGuard
   */
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    if (!headers.hasOwnProperty('internal-api-key')) {
      throw new UnauthorizedException('Internal API key not provided');
    }

    if (headers['internal-api-key'] !== process.env['INTERNAL_API_KEY']) {
      console.log('Invalid Internal API key');
      throw new UnauthorizedException('Invalid Internal API key');
    } else {
      return true;
    }
  }
}
