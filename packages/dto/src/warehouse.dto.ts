import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateWarehouseDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  address!: string;
}

export class UpdateWarehouseDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address?: string;
}

export class UpdateInventoryDto {
  @IsInt()
  productId!: number;

  @IsInt()
  warehouseId!: number;

  @IsInt()
  @Min(0)
  quantity!: number;
}