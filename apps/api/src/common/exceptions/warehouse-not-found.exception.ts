import { NotFoundException } from '@nestjs/common';

export class WarehouseNotFoundException extends NotFoundException {
  constructor(warehouseId: number) {
    super(`Warehouse with ID ${warehouseId} not found`);
  }
}