import { Type } from 'class-transformer';
import {
  IsArray,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  dateTime: string;

  @IsDecimal()
  @IsNotEmpty()
  totalFee: number;

  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  serviceId: number[];
}
