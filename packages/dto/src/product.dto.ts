import { IsString, IsNotEmpty, IsNumber, IsEnum, IsUrl, IsOptional, Min } from 'class-validator';
import { Category } from './enums';
import { ApiProperty } from '@nestjs/swagger';


export class CreateProductDto {
  @ApiProperty({ example: 'Mechanical Keyboard', description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'Keyboard with blue switches', description: 'Product description' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 49.99, description: 'Product price' })
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: Category.ELECTRONICS, description: 'Product category' })
  @IsEnum(Category)
  category!: Category;

  @ApiProperty({ example: 'https://example.com/images/keyboard.png', description: 'URL of the product image' })
  @IsUrl()
  urlImage!: string;
}

export class UpdateProductDto {
  @ApiProperty({ example: 'New Keyboard Name', description: 'Product name', required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ example: 'New description', description: 'Product description', required: false })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  @ApiProperty({ example: 59.99, description: 'Product price', required: false })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiProperty({ example: Category.BOOKS, description: 'Product category', required: false })
  @IsOptional()
  @IsEnum(Category)
  category?: Category;

  @ApiProperty({ example: 'https://example.com/images/new.png', description: 'URL of the product image', required: false })
  @IsOptional()
  @IsUrl()
  urlImage?: string;
}