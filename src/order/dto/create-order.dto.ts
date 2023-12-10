import { IsDate, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ServiceDto {
  @ApiProperty({
    description: 'The unique identifier of the service',
    example: 1,
    type: Number,
  })
  @IsInt()
  id: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'Date and time of the order',
    example: '2023-01-01T10:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  dateTime: Date;

  @ApiProperty({
    description: 'Total fee for the order',
    example: 100,
    type: Number,
  })
  @IsInt()
  totalFee: number;

  @ApiProperty({
    description: 'List of services associated with the order',
    type: [ServiceDto],
    isArray: true,
    example: [{ id: 1 }, { id: 2 }],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ServiceDto)
  services: ServiceDto[];
}
