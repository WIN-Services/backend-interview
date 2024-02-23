/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductService } from './entities/product-service.entity';

@Injectable()
export class ProductServiceRepository {
    constructor(@InjectModel(ProductService.name) public productServiceModel: Model<ProductService>
    ) { }
}
