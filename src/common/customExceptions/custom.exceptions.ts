import { HttpException, HttpStatus } from '@nestjs/common';

export class DUPLICATE_SIGNUP_EXCEPTION extends HttpException {
  constructor() {
    super('', HttpStatus.CONFLICT);
  }
}

export class NOT_FOUND_EXCEPTION extends HttpException {
  constructor() {
    super('', HttpStatus.NOT_FOUND);
  }
}

export class BAD_REQUEST_EXCEPTION extends HttpException {
  constructor() {
    super('', HttpStatus.BAD_REQUEST);
  }
}

export class UNAUTHORIZED_REQUEST_EXCEPTION extends HttpException {
  constructor() {
    super('', HttpStatus.UNAUTHORIZED);
  }
}

export class TOKEN_EXPIRED_EXCEPTION extends HttpException {
  constructor() {
    super('', HttpStatus.UNAUTHORIZED);
  }
}

export class INVALID_TOKEN_EXCEPTION extends HttpException {
  constructor() {
    super('', HttpStatus.UNAUTHORIZED);
  }
}

export class INTERNAL_SERVER_ERROR extends HttpException {
  constructor() {
    super('', HttpStatus.BAD_REQUEST);
  }
}

export class UNIQUE_EXCEPTION extends HttpException {
  constructor() {
    super('', HttpStatus.CONFLICT);
  }
}

export class CUSTOM_EXCEPTION extends HttpException {
  constructor(status: HttpStatus, message: string) {
    super(message, status);
  }
}
