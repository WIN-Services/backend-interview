import { IsOptional, IsString } from 'class-validator';

export class GetWinServicesFilterDto {
  @IsOptional()
  @IsString()
  name?: string;
}
