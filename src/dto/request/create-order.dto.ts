import {
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsUUID,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

class ServiceDto {
  @IsUUID()
  id: string;
}

export class CreateOrderRequestDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNumber()
  totalfee: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ServiceDto)
  services: ServiceDto[];
}
