import { IsString } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  name: string;
}
