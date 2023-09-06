import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
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
    if (response['statusCode'] === 200) {
      message = 'The request has been succeeded.';
    }
    if (response['statusCode'] === 201) {
      message = 'Request succeeded and resource has been created.';
    }
    if (response['statusCode'] > 201 && response['statusCode'] <= 299) {
      message = 'Request succeeded.';
    }
    return next.handle().pipe(
      map((data) => ({
        data: data,
        error: false,
        statusCode: response['statusCode'],
        message: message,
      })),
    );
  }
}
