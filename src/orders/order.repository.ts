/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders } from './entities/orders.entity';

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectModel(Orders.name) public orderModel: Model<Orders>
    ) { }
}
