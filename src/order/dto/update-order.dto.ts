// update-order.dto.ts
import {PartialType} from '@nestjs/mapped-types';
import {CreateOrderDto} from './create-order.dto';

export class UpdateOrderDto {
    totalFee: number
}
