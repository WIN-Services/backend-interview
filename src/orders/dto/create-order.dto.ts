import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { UUID_VERSION } from 'src/constants';

export class Service {
  @ApiProperty({
    description: 'Service ID associated with the order.',
    type: String,
  })
  @IsUUID(UUID_VERSION)
  id: string;

  @ApiProperty({
    description: 'amount associated with the Service.',
    type: Number,
  })
  @IsPositive()
  @IsNumber()
  amount: number;
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'A list of service IDs associated with the order.',
    type: [Service],
  })
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => Service)
  services: Service[];

  @ApiProperty({ description: 'ID of the user placing order', type: String })
  @IsUUID(UUID_VERSION)
  user_id: string;
}
