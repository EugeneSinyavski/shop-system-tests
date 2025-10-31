import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'dto';
import { PrismaService } from '../prisma/prisma.service';
import { ProductNotFoundException } from '../common/exceptions/product-not-found.exception';

@Injectable()
export class ProductService {

  constructor(private prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({data: createProductDto})
  }

  async findAllProducts() {
    return await this.prisma.product.findMany();
  }

  async findProductById(productId: number) {
    return await this.verifyProductExists(productId);
  }

  async updateProduct(productId: number, updateProductDto: UpdateProductDto) {
    await this.verifyProductExists(productId);
    return await this.prisma.product.update({ where: { id: productId }, data: updateProductDto });
  }

  async removeProduct(productId: number) {
    await this.verifyProductExists(productId);
    return await this.prisma.product.delete({ where: { id: productId } })
  }

  private async verifyProductExists(productId: number) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new ProductNotFoundException(productId);
    }
    return product;
  }
}