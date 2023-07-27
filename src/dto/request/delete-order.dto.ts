import { IsAlphanumeric, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteOrderRequestDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
