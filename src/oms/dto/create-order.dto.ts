import { ApiProperty } from '@nestjs/swagger';
const JOI = require('joi');

export class CreateOrderRequestDto {
    @ApiProperty({
        description: 'User Id of the user to accept friend request.',
        type: String,
    })
    user_id: string;
}

export const CreateOrderRequestDtoValidation = JOI.object({
    user_id: JOI.string().max(100).required().strict(),
});
