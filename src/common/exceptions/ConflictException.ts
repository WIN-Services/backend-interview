import { Exception } from './Exception';
import { ErrorCode } from './ErrorCode';

export class ConflictException extends Exception {
  constructor(message: string, path?: string) {
    super(ErrorCode.Conflict, message, path);
  }
}
