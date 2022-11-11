import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsArray, IsNotEmpty, IsDate } from "class-validator";

export class CreateOrder {

    @ApiProperty()
    @IsOptional()
    @IsDate()
    dateTime: Date;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    totalFee: number;

    @ApiProperty({type: [Number]})
    @IsArray()
    @IsNotEmpty()
    services: number[];
}