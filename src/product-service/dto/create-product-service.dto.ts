import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductServiceDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Product Name', type: String, required: false })
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Product Display Name', type: String, required: false })
    display_name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Product Display Name', type: String, required: false })
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(2)
    @ApiProperty({ description: 'Price', type: Number, required: true })
    price?: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Currency', type: Number, required: true })
    currency?: string;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ description: 'IsActive', type: Boolean, required: true })
    is_active?: boolean;
}



