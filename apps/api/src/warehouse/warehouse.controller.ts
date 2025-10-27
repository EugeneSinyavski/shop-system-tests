import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto, UpdateInventoryDto, UpdateWarehouseDto } from 'dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  createWarehouse(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.createWarehouse(createWarehouseDto);
  }

  @Get()
  getAllWarehouses() {
    return this.warehouseService.getAllWarehouses();
  }

  @Patch(':id')
  updateWarehouse(@Param('id', ParseIntPipe) id: number, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseService.updateWarehouse(id, updateWarehouseDto);
  }

  @Post('inventory')
  updateInventory(@Body() updateInventoryDto: UpdateInventoryDto) {
    return this.warehouseService.updateInventory(updateInventoryDto);
  }
}