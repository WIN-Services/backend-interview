import { Exception } from './Exception';
import { ErrorCode } from './ErrorCode';

export class ForbiddenException extends Exception {
  constructor(message: string = 'forbidden', path?: string) {
    super(ErrorCode.Forbidden, message, path);
  }
}
