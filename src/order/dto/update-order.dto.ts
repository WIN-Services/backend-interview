import {
  IsDate,
  IsInt,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ServiceDto {
  @ApiProperty({
    description: 'The unique identifier of the service',
    example: 1,
    type: Number,
  })
  @IsInt()
  id: number;
}

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Date and time of the order',
    example: '2023-01-01T10:00:00.000Z',
    type: Date,
  })
  @IsOptional()
  @IsDate()
  dateTime?: Date;

  @ApiPropertyOptional({
    description: 'Total fee for the order',
    example: 100,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  totalFee?: number;

  @ApiPropertyOptional({
    description: 'List of services associated with the order',
    type: [ServiceDto],
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceDto)
  services?: ServiceDto[];
}
