import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceRecordDto {
  @ApiProperty({
    description: 'The name of the service record',
    example: 'Inspection Service',
  })
  @IsString()
  name: string;
}
