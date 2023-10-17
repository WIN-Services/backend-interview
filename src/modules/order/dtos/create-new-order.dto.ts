import { ArrayNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../../../shared/database/postgres/models/order.model';

export class OrderBaseDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `status must be one of ${Object.values(OrderStatus).join(', ')}`,
  })
  status?: OrderStatus;
}

export class CreateNewOrderDto extends OrderBaseDto {
  @ArrayNotEmpty()
  @IsString({ each: true })
  services: Array<string>;
}
