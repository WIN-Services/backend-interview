import { IsNotEmpty, IsDateString, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateOrderValidator {
    @IsNotEmpty()
    @IsDateString()
    datetime: string;

    @IsNotEmpty()
    totalFee: number;

    @IsArray()
    @ArrayNotEmpty()
    services: number[];
}
