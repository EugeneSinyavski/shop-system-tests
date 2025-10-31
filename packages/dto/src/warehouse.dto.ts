import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWarehouseDto {
  @ApiProperty({ example: 'Magazzino Centrale', description: 'Warehouse title' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Via Roma 25, Milano, MI 20121', description: 'Warehouse address' })
  @IsString()
  @IsNotEmpty()
  address!: string;
}

export class UpdateWarehouseDto {
  @ApiProperty({ example: 'Magazzino Nord', description: 'Warehouse title', required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({ example: 'Via Garibaldi 10, Torino, TO 10122', description: 'Warehouse address', required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;
}

export class UpdateInventoryDto {
  @ApiProperty({ example: 1, description: 'The ID of the product' })
  @IsInt()
  productId!: number;

  @ApiProperty({ example: 1, description: 'The ID of the warehouse' })
  @IsInt()
  warehouseId!: number;

  @ApiProperty({ example: 100, description: 'The new quantity of the product' })
  @IsInt()
  @Min(0)
  quantity!: number;
}