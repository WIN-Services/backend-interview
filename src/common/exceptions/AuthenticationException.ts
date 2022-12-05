import { Exception } from './Exception';
import { ErrorCode } from './ErrorCode';

export class AuthenticationException extends Exception {
  constructor(message: string = 'User not authenticated', path?: string) {
    super(ErrorCode.Unauthorised, message, path);
  }
}
