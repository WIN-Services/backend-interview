import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceRecordDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
