import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

@Injectable()
export class InternalApiGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {
    }

    public canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const headers = request.headers;
        if (!headers.hasOwnProperty('internal-api-key')) {
            throw new UnauthorizedException('Internal API key not provided');
        }

        if (headers['internal-api-key'] !== process.env['INTERNAL_API_KEY']) {
            throw new UnauthorizedException('Invalid Internal API key');
        } else {
            return true;
        }
    }
}