import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceRecordDto } from './create-service-record.dto';

export class UpdateServiceRecordDto extends PartialType(
  CreateServiceRecordDto,
) {}
