import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServiceProductsEntity } from "./entities/service-product.entity";
import { ServiceProductService } from "./service-products.service";
import { ServiceProductController } from "./service-products.controller";

@Module({
    imports: [TypeOrmModule.forFeature([ServiceProductsEntity])],
    controllers: [ServiceProductController],
    providers: [ServiceProductService],
    exports: [ServiceProductService]
})
export class ServiceProductsModule {

}