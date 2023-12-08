import { IsString, IsNumber } from 'class-validator'

export class ServiceProductCreateDTO {
    @IsString()
    name: string

    @IsNumber()
    pricing: number
}