import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateOrderDto {
    @ApiProperty({ description: 'Product Service Id', type: [String], required: true })
    @IsArray()
    @IsNotEmpty()
    @MinLength(1)
    product_service_ids: [string]

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Customer Id', type: String, required: true })
    customer_id: string;
}