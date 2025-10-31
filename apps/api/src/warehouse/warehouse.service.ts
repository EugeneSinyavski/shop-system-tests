import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWarehouseDto, UpdateInventoryDto, UpdateWarehouseDto } from 'dto';
import { WarehouseNotFoundException } from '../common/exceptions/warehouse-not-found.exception';
import { ProductNotFoundException } from '../common/exceptions/product-not-found.exception';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  async createWarehouse(createWarehouseDto: CreateWarehouseDto) {
    return await this.prisma.warehouse.create({ data: createWarehouseDto });
  }

  async getAllWarehouses() {
    return await this.prisma.warehouse.findMany();
  }

  async findWarehouseById(warehouseId: number) {
    return await this.verifyWarehouseExists(warehouseId);
  }

  async updateWarehouse(warehouseId: number, updateWarehouseDto: UpdateWarehouseDto) {
    await this.verifyWarehouseExists(warehouseId);

    return await this.prisma.warehouse.update({
      where: { id: warehouseId },
      data: updateWarehouseDto
    });
  }

  async updateInventory(dto: UpdateInventoryDto) {
    await this.verifyWarehouseExists(dto.warehouseId);
    await this.verifyProductExists(dto.productId);

    return await this.prisma.productLocation.upsert({
      where: {
        product_id_warehouse_id: {
          product_id: dto.productId,
          warehouse_id: dto.warehouseId,
        }
      },
      update: {
        quantity: dto.quantity,
      },
      create: {
        product_id: dto.productId,
        warehouse_id: dto.warehouseId,
        quantity: dto.quantity,
      },
    });
  }

  private async verifyWarehouseExists(warehouseId: number) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id: warehouseId }
    });

    if (!warehouse) {
      throw new WarehouseNotFoundException(warehouseId);
    }
    return warehouse;
  }

  private async verifyProductExists(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      throw new ProductNotFoundException(productId);
    }
    return product;
  }
}