import { Exception } from './Exception';
import { ErrorCode } from './ErrorCode';

export class BadRequestException extends Exception {
  constructor(message: string, path?: string) {
    super(ErrorCode.BadRequest, message, path);
  }
}
