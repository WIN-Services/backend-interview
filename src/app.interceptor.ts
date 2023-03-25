import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import * as express from 'express';
import { map, Observable } from 'rxjs';
import { Logger } from 'winston';

export interface Response<T> {
  code: number;
  message: string;
  data: T;
}
@Injectable()
export class AppInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const req: express.Request = context.switchToHttp().getRequest();
    const { method, url, headers, body } = req;

    const requestData = {
      host: headers.host,
      userAgent: headers['user-agent'],
      contentLength: headers['content-length'],
      body: body,
    };
    this.logger.info(`Request - ${method}: ${url}`, requestData);
    return next.handle().pipe(
      map((data) => ({
        code: context.switchToHttp().getResponse().statusCode,
        message: data['message'] ? data['message'] : 'Success',
        data: this.removeMessageKey(data),
      })),
    );
  }
  private removeMessageKey(data: T): T | null {
    data['message'] ? delete data['message'] : null;
    return Object.keys(data).length > 0 ? data : null;
  }
}
