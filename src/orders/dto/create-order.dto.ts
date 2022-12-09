import { IsNotEmpty } from "class-validator";
import { IsArray } from "class-validator/types/decorator/decorators";




export class CreateOrderDto {

    @IsNotEmpty()
    @IsArray()
    services : string[]


}
