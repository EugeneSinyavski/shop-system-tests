import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBucketDto {
  @ApiProperty({ example: 1, description: 'The ID of the product to add/remove' })
  @IsInt()
  @IsNotEmpty()
  productId!: number;
}
