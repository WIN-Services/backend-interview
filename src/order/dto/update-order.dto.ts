import {IsNumber} from "class-validator";

export class UpdateOrderDto {
    @IsNumber()
    totalFee: number
}
