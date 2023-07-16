import { IsArray, IsNumber } from 'class-validator';
export class CreateOrderDto {
  @IsNumber()
  totalfee: number;

  @IsArray()
  services: string[];
}
