import { ApiProperty } from '@nestjs/swagger';
import { OrderServiceRequestDto } from './create-order.dto';
const JOI = require('joi');

export class UpdateOrderRequestDto {
  @ApiProperty({
    description: 'Order id.',
    type: String,
  })
  id: string;
  @ApiProperty({
    description: 'Order Items included in order.',
    type: [OrderServiceRequestDto],
  })
  order_items: OrderServiceRequestDto[];
}

export const UpdateOrderRequestDtoValidation = JOI.object({
  id: JOI.string().max(100).required().strict(),
  order_items: JOI.array()
    .items(
      JOI.object({
        name: JOI.string().max(100).min(3).trim().required().strict(),
        amount: JOI.number().positive().required().strict(),
      }),
    )
    .strict(),
});