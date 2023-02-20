'use strict';

import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class orderDto {
  @IsNotEmpty()
  @IsDateString()
  dateTime: Date;

  @IsNotEmpty()
  @IsNumber()
  totalFee: number;

  @IsNotEmpty()
  @IsNumber()
  serviceId: number;
}
