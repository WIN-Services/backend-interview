import { Module } from '@nestjs/common';
import { ProductServiceDetailsService } from './product-service.service';
import { ProductServiceController } from './product-service.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService, productServiceSchema } from './entities/product-service.entity';
import { ProductServiceRepository } from './product-service.repository';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: ProductService.name, schema: productServiceSchema }])
  ],
  controllers: [ProductServiceController],
  providers: [ProductServiceDetailsService, ProductServiceRepository],
  exports: [ProductServiceRepository]
})
export class ProductServiceModule { }
