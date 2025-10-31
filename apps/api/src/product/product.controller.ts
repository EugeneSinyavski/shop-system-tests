import { Body, Controller, Get, Param, Post, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from 'dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request. Validation failed.' })
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'Returns a list of all products.' })
  findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'productId', description: 'The ID of the product' })
  @ApiResponse({ status: 200, description: 'Returns the product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  findProductById(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findProductById(productId);
  }

  @Patch(':productId')@ApiOperation({ summary: 'Update a product by ID' })
  @ApiParam({ name: 'productId', description: 'The ID of the product to update' })
  @ApiResponse({ status: 200, description: 'Product successfully updated.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  updateProduct(
    @Param('productId', ParseIntPipe) productId : number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(productId, updateProductDto);
  }

  @Delete(':productId')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiParam({ name: 'productId', description: 'The ID of the product to delete' })
  @ApiResponse({ status: 200, description: 'Product successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  removeProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.removeProduct(productId);
  }
}