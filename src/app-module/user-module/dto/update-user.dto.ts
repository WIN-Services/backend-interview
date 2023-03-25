import { IsEmail, IsNotEmpty, IsString } from "class-validator";
export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
