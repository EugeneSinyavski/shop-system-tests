import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto, UpdateInventoryDto, UpdateWarehouseDto } from 'dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('warehouse')
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new warehouse' })
  @ApiResponse({ status: 201, description: 'Warehouse successfully created.' })
  createWarehouse(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.createWarehouse(createWarehouseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all warehouses' })
  @ApiResponse({ status: 200, description: 'Returns a list of all warehouses.' })
  getAllWarehouses() {
    return this.warehouseService.getAllWarehouses();
  }

  @Get(':warehouseId')
  @ApiOperation({ summary: 'Get a warehouse by ID' })
  @ApiParam({ name: 'warehouseId', description: 'The ID of the warehouse' })
  @ApiResponse({ status: 200, description: 'Returns the warehouse.' })
  @ApiResponse({ status: 404, description: 'Warehouse not found.' })
  findWarehouseById(@Param('warehouseId', ParseIntPipe) warehouseId: number) {
    return this.warehouseService.findWarehouseById(warehouseId);
  }

  @Patch(':warehouseId')
  @ApiOperation({ summary: 'Update a warehouse by ID' })
  @ApiParam({ name: 'warehouseId', description: 'The ID of the warehouse to update' })
  @ApiResponse({ status: 200, description: 'Warehouse successfully updated.' })
  @ApiResponse({ status: 404, description: 'Warehouse not found.' })
  updateWarehouse(@Param('warehouseId', ParseIntPipe) warehouseId: number, @Body() updateWarehouseDto: UpdateWarehouseDto) {
    return this.warehouseService.updateWarehouse(warehouseId, updateWarehouseDto);
  }

  @Post('inventory')
  @ApiOperation({ summary: 'Update inventory' })
  @ApiResponse({ status: 201, description: 'Inventory successfully updated or created.' })
  @ApiResponse({ status: 404, description: 'Product or Warehouse not found.' })
  updateInventory(@Body() updateInventoryDto: UpdateInventoryDto) {
    return this.warehouseService.updateInventory(updateInventoryDto);
  }
}