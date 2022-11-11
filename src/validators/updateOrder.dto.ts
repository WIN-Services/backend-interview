import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsArray, IsNotEmpty } from "class-validator";

export class UpdateOrder {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    totalFee: number;

    @ApiPropertyOptional({type: [Number]})
    @IsArray()
    @IsOptional()
    services: number[];
}