import { ApiProperty } from '@nestjs/swagger';

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