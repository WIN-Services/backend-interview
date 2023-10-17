import { ArrayNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '../../../shared/database/postgres/models/order.model';

export class CreateNewOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus, {
    message: `status must be one of ${Object.values(OrderStatus).join(', ')}`,
  })
  status?: OrderStatus;

  @ArrayNotEmpty()
  @IsString({ each: true })
  services: Array<string>;
}
