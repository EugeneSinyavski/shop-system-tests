import { IsArray, IsEnum, IsInt, IsNotEmpty, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from './enums';

class CreateOrderItemDto {
  @IsInt()
  @IsNotEmpty()
  product_id!: number;

  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}

export class UpdateOrderDto {
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}