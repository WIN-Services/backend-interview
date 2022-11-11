import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class GetSingleOrder {

    @ApiProperty()
    @Transform(({ value }) => +value)
    @IsNumber()
    id: number;
}