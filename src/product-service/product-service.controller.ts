import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Query } from '@nestjs/common';
import { ProductServiceDetailsService } from './product-service.service';
import { CreateProductServiceDto } from './dto/create-product-service.dto';
import { UpdateServiceRecordDto } from './dto/update-product-service.dto';
import { Roles } from 'src/role/role-decorators';
import { Role } from 'src/role/role-guard';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('product-service')
@Controller('product-service')
export class ProductServiceController {
  constructor(private readonly productServiceDetailsService: ProductServiceDetailsService) { }

  @Post('/create')
  @Roles(Role.ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Admin token needed',
  })
  @ApiOperation({
    summary: "Create Product Service",
    description: "create Product Service Description"
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Product Service has been successfully created',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.PRECONDITION_FAILED,
    description: 'Failed Precondition.',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'The Product already exist with this name',
  })
  create(@Body() createServiceRecordDto: CreateProductServiceDto) {
    return this.productServiceDetailsService.createProductService(createServiceRecordDto);
  }

  @Get('/all')
  @Roles(Role.CUSTOMER || Role.ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Admin token needed',
  })
  @ApiOperation({
    summary: "All Product Services",
    description: "List all Product Service Description"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Product Service has been successfully listed',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.PRECONDITION_FAILED,
    description: 'Failed Precondition.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The Product services not found',
  })
  findAll(
    @Query('page') page: number,
    @Query('page_size') page_size: number) {
    return this.productServiceDetailsService.listAllProduct(page, page_size);
  }


  @Patch('/update/:id')
  @Roles(Role.ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Admin token needed',
  })
  @ApiOperation({
    summary: "Update Product Service",
    description: "Updates the Product Service Description"
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'The Product Service has been successfully updated',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.PRECONDITION_FAILED,
    description: 'Failed Precondition.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The Product not found with given Id',
  })
  update(@Param('id') id: string, @Body() updateServiceRecordDto: UpdateServiceRecordDto) {
    return this.productServiceDetailsService.updateProductService(id, updateServiceRecordDto);
  }

  @Delete('/remove/:id')
  @Roles(Role.ADMIN)
  @ApiHeader({
    name: 'Authorization',
    description: 'Admin token needed',
  })
  @ApiOperation({
    summary: "Delete Product Service",
    description: "Delete the Product Service Description"
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The Product Service has been successfully deleted',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({
    status: HttpStatus.PRECONDITION_FAILED,
    description: 'Failed Precondition.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'The Product not found with given Id',
  })
  remove(@Param('id') id: string) {
    return this.productServiceDetailsService.removeProductService(id);
  }
}
