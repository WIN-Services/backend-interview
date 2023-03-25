import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  orders: string;
}
