import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, ValidateNested } from 'class-validator';
import { UUID_VERSION } from '../../constants';
import { Service } from './create-order.dto';
import { Type } from 'class-transformer';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'ID of the order to updated.',
    type: String,
  })
  @IsUUID(UUID_VERSION)
  order_id: string;

  @ApiProperty({
    description: 'A list of service IDs associated with the order.',
    type: [Service],
  })
  @ValidateNested()
  @Type(() => Service)
  services: Service[];
}
