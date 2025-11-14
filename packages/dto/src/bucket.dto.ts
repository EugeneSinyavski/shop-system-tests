import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUpdateBucketDto } from "./bucket.types";

export class UpdateBucketDto implements IUpdateBucketDto{
  @ApiProperty({ example: 1, description: 'The ID of the product to add/remove' })
  @IsInt()
  @IsNotEmpty()
  productId!: number;
}
