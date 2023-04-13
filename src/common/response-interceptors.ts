import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Response<T> {
  data: T;
}

@Injectable()
export class GlobalResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response<T>>();
    let message = '';
    if (response['statusCode'] === HttpStatus.OK) {
      message = 'The request has been succeeded.';
    }
    if (response['statusCode'] === HttpStatus.CREATED) {
      message = 'Request succeeded and resource has been created.';
    }
    if (
      response['statusCode'] > HttpStatus.CREATED &&
      response['statusCode'] <= 299
    ) {
      message = 'Request succeeded.';
    }
    return next.handle().pipe(
      map((data) => ({
        data: data,
        error: false,
        code: response['statusCode'],
        message: message,
      })),
    );
  }
}
