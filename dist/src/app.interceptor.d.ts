import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from 'winston';
export interface Response<T> {
    code: number;
    message: string;
    data: T;
}
export declare class AppInterceptor<T> implements NestInterceptor<T, Response<T>> {
    private readonly logger;
    constructor(logger: Logger);
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
    private removeMessageKey;
}
