'use strict';

import { IsNotEmpty, IsString } from 'class-validator';

export class serviceDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
