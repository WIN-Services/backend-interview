import { ApiProperty } from '@nestjs/swagger';
import { HttpError } from '../errors/custom.errors';
import { HttpStatus } from '@nestjs/common';
// import { UserProfile } from '../user_profile/entity/user_profile.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const JOI = require('joi');
const axios = require('axios');

export class Pagination {
  @ApiProperty()
  page_size: number;
  @ApiProperty()
  page: number;
}

export const PaginationValidation = JOI.object({
  page_size: JOI.number().min(1).max(100).required(),
  page: JOI.number().min(0).required(),
});

export async function checkHeadersForPlatformUser(headers) {
  if (!headers) {
    throw HttpError(HttpStatus.UNAUTHORIZED, 'Unauthorized user!');
  } else if (
    !headers?.user_profile_id ||
    !headers?.device_id
  ) {
    throw HttpError(HttpStatus.UNAUTHORIZED, 'Unauthorized user!');
  }
}

// export function getUserDetailsFromHeader(headers): UserProfile {
//   return {
//     _id: headers?.user_profile_id,
//     device_id: headers["device-id"],
//     country_code: headers?.country_code,
//     email: headers?.email,
//     name: headers?.name,
//     phone_number: headers?.phone_number,
//   };
// }
