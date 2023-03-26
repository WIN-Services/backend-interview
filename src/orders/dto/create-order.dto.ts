import {IsDateString, IsNotEmpty, IsNumber} from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsDateString()
    datetime: Date;

    @IsNotEmpty()
    @IsNumber()
    totalfee: number;

    @IsNotEmpty()
    @IsNumber()
    services: Array<Object>;
}
