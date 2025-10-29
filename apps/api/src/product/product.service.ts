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

  async findProductById(id: number) {
    return await this.verifyProductExists(id);
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    await this.verifyProductExists(id);
    return await this.prisma.product.update({ where: { id }, data: updateProductDto });
  }

  async removeProduct(id: number) {
    await this.verifyProductExists(id);
    return await this.prisma.product.delete({ where: { id} })
  }

  private async verifyProductExists(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new ProductNotFoundException(id);
    }
    return product;
  }
}