
import { ApiProperty } from "@nestjs/swagger/dist";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { CreateService } from "./createService.dto";

export class UpdateService {

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}