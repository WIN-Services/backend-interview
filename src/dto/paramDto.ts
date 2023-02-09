'use strict';

import { IsNotEmpty } from 'class-validator';

export class paramDto {
  @IsNotEmpty()
  id: number;
}
