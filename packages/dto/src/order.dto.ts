import { IsArray, IsEnum, IsInt, IsNotEmpty, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from './enums';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateOrderDto, ICreateOrderItemDto, IUpdateOrderDto } from "./order.types";

class CreateOrderItemDto implements ICreateOrderItemDto {
  @ApiProperty({ example: 1, description: 'Product ID' })
  @IsInt()
  @IsNotEmpty()
  product_id!: number;

  @ApiProperty({ example: 2, description: 'Quantity of the product' })
  @IsInt()
  @Min(1)
  quantity!: number;
}

export class CreateOrderDto implements ICreateOrderDto {
  @ApiProperty({ type: [CreateOrderItemDto], description: 'List of order items' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];
}

export class UpdateOrderDto implements IUpdateOrderDto {
  @ApiProperty({ example: OrderStatus.SHIPPED, description: 'The new status of the order' })
  @IsEnum(OrderStatus)
  status!: OrderStatus;
}
