import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { UpdateBucketDto } from 'dto';

@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Get(':userId')
  findBucketByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.bucketService.findBucketByUserId(userId);
  }

  @Post(':userId/addProduct')
  addProductToBucket(@Param('userId', ParseIntPipe) userId: number, @Body() dto: UpdateBucketDto,) {
    return this.bucketService.addProductToBucket(userId, dto);
  }

  @Delete(':userId/removeProduct')
  removeProductFromBucket(@Param('userId', ParseIntPipe) userId: number, @Body() dto: UpdateBucketDto) {
    return this.bucketService.removeProductFromBucket(userId, dto);
  }
}
