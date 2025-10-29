import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWarehouseDto, UpdateInventoryDto, UpdateWarehouseDto } from 'dto';
import { WarehouseNotFoundException } from '../common/exceptions/warehouse-not-found.exception';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  async createWarehouse(createWarehouseDto: CreateWarehouseDto) {
    return await this.prisma.warehouse.create({ data: createWarehouseDto });
  }

  async getAllWarehouses() {
    return await this.prisma.warehouse.findMany();
  }

  async findWarehouseById(id: number) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id }
    });

    if (!warehouse) {
      throw new WarehouseNotFoundException(id);
    }
    return warehouse;
  }

  async updateWarehouse(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    return await this.prisma.warehouse.update({
      where: { id },
      data: updateWarehouseDto
    });
  }

  async updateInventory(dto: UpdateInventoryDto) {
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
}