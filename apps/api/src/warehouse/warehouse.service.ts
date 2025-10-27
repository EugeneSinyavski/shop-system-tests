import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWarehouseDto, UpdateInventoryDto, UpdateWarehouseDto } from 'dto';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  createWarehouse(createWarehouseDto: CreateWarehouseDto) {
    return this.prisma.warehouse.create({ data: createWarehouseDto });
  }

  getAllWarehouses() {
    return this.prisma.warehouse.findMany();
  }

  updateWarehouse(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    return this.prisma.warehouse.update({
      where: { id },
      data: updateWarehouseDto
    });
  }

  updateInventory(dto: UpdateInventoryDto) {
    return this.prisma.productLocation.upsert({
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