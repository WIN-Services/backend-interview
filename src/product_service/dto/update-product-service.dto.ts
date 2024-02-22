import { PartialType } from '@nestjs/swagger';
import { CreateProductServiceDto } from './create-product-service.dto';

export class UpdateServiceRecordDto extends PartialType(CreateProductServiceDto) {}
