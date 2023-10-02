// create-order.dto.ts
import { IsArray, ArrayNotEmpty, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNumber()
    totalFee: number;

    @IsArray()
    @ArrayNotEmpty()
    services: number[];
}
