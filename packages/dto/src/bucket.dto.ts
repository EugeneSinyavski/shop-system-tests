import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateBucketDto {
  @IsInt()
  @IsNotEmpty()
  productId!: number;
}