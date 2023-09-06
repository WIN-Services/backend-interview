import { ApiProperty } from '@nestjs/swagger';
const JOI = require('joi');

export class OrderServiceRequestDto {
  @ApiProperty({
    description: 'Name of the service.',
    type: String,
  })
  name: string;
  @ApiProperty({
    description: 'Item price which included in the order.',
    type: Number,
  })
  amount: number;
}

export class CreateOrderRequestDto {
  @ApiProperty({
    description: 'User Id of the user to create an order.',
    type: String,
  })
  user_id: string;
  @ApiProperty({
    description: 'Order Items included in order.',
    type: [OrderServiceRequestDto],
  })
  services: OrderServiceRequestDto[];
}

export const CreateOrderRequestDtoValidation = JOI.object({
  user_id: JOI.string().max(100).required().strict(),
  services: JOI.array()
    .items(
      JOI.object({
        name: JOI.string().max(100).min(3).trim().required().strict(),
        amount: JOI.number().positive().required().strict(),
      }),
    )
    .strict(),
});