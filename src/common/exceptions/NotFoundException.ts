import { Exception } from './Exception';
import { ErrorCode } from './ErrorCode';

export class NotFoundException extends Exception {
  constructor(message: string, path?: string) {
    super(ErrorCode.NotFound, message, path);
  }
}
