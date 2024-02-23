import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateProductServiceDto } from './dto/create-product-service.dto'
import { UpdateServiceRecordDto } from './dto/update-product-service.dto';
import { ProductServiceRepository } from './product-service.repository';
import { HttpError } from 'src/errors/custom.errors';

@Injectable()
export class ProductServiceDetailsService {
  private readonly logger = new Logger(ProductServiceDetailsService.name);
  constructor(
    private readonly productServiceRepository: ProductServiceRepository
  ) { }
  async createProductService(createProductServiceDto: CreateProductServiceDto) {
    let productService;
    try {
      productService = await this.productServiceRepository.productServiceModel.findOne({ name: createProductServiceDto.name, is_active: true }).lean()
    } catch (error) {
      this.logger.error(
        `Error occurred while find existing product service ${this.createProductService.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    if (productService) {
      throw HttpError(HttpStatus.BAD_REQUEST, `product service already exists with same name: ${createProductServiceDto.name}`);
    }

    try {
      productService = await this.productServiceRepository.productServiceModel.create(createProductServiceDto)
    } catch (error) {
      this.logger.error(
        `Error occurred while find existing product service ${this.createProductService.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    return productService;
  }

  async listAllProduct(page: number = 0, page_size: number = 10) {
    let productServices;
    try {
      productServices = await this.productServiceRepository.productServiceModel.find({ is_active: true }).sort({ created_at: -1 })
        .limit(page_size)
        .skip(page_size * page)
        .lean();
    } catch (error) {
      this.logger.error(
        `Error occurred while find existing product service ${this.listAllProduct.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    return productServices;
  }


  async updateProductService(id: string, updateServiceRecordDto: UpdateServiceRecordDto) {
    let productService;
    try {
      productService = await this.productServiceRepository.productServiceModel.findOneAndUpdate({ _id: id, is_active: true }, updateServiceRecordDto, { new: true }).lean()
    } catch (error) {
      this.logger.error(
        `Error occurred while find existing product service ${this.updateProductService.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    if (!productService) {
      throw HttpError(HttpStatus.BAD_REQUEST, `product service not found with id: ${id}`);
    }

    return "product service updated successfully!"
  }

  async removeProductService(id: string) {
    let productService;
    try {
      productService = await this.productServiceRepository.productServiceModel.findOneAndUpdate({ _id: id, is_active: true }, { is_active: false }, { new: true })
    } catch (error) {
      this.logger.error(
        `Error occurred while find existing product service ${this.removeProductService.name}:${error.message}`,
      );
      throw HttpError(HttpStatus.INTERNAL_SERVER_ERROR, 'Something went wrong');
    }

    if (!productService) {
      throw HttpError(HttpStatus.BAD_REQUEST, `product service not found with id: ${id}`);
    }

    return "product service deleted successfully!"
  }
}
