import { IsArray } from "class-validator";

export class CreateOrderDTO {
    @IsArray()
    services: string[]
}