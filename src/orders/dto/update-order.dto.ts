import { IsArray, IsNotEmpty } from "class-validator";

export class UpdateOrderDto  {

    @IsNotEmpty()
    @IsArray()
    services : string[]


}
