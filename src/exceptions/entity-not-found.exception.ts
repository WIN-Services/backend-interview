import { ApiErrorCode, HttpException } from "./http.exception";

export class EntityNotFoundException extends HttpException {
  constructor(entity: string, errorCode: ApiErrorCode, meta?: any) {
    super(`${entity} Not Found !!`, errorCode, 404, meta);
  }
}
