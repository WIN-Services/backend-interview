import { IsAlphanumeric, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetOrderRequestDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
