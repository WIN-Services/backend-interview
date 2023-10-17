import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderBaseDto } from './create-new-order.dto';

export class UpdateOrderQueryDto {
  @IsNotEmpty()
  @IsString()
  orderId: string;
}

export class UpdateOrderBodyDto extends OrderBaseDto {
  @IsOptional()
  @ArrayNotEmpty()
  @IsString({ each: true })
  services?: Array<string>;
}
