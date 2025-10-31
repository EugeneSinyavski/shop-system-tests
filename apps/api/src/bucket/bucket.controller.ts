import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe } from '@nestjs/common';
import { BucketService } from './bucket.service';
import { UpdateBucketDto } from 'dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('bucket')
@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Get(':userId')
  @ApiOperation({ summary: "Get a user's bucket" })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiResponse({ status: 200, description: "Returns the user's bucket and its items." })
  @ApiResponse({ status: 404, description: 'User or bucket not found.' })
  findBucketByUserId(@Param('userId', ParseIntPipe) userId: number) {
    return this.bucketService.findBucketByUserId(userId);
  }

  @Post(':userId/addProduct')
  @ApiOperation({ summary: 'Add a product to the bucket' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiResponse({ status: 201, description: 'Product added to bucket successfully.' })
  @ApiResponse({ status: 404, description: 'User or product not found.' })
  addProductToBucket(@Param('userId', ParseIntPipe) userId: number, @Body() dto: UpdateBucketDto,) {
    return this.bucketService.addProductToBucket(userId, dto);
  }

  @Delete(':userId/removeProduct')
  @ApiOperation({ summary: 'Remove a product from the bucket' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiResponse({ status: 200, description: 'Product removed from bucket successfully.' })
  @ApiResponse({ status: 404, description: 'User or product not found in bucket.' })
  removeProductFromBucket(@Param('userId', ParseIntPipe) userId: number, @Body() dto: UpdateBucketDto) {
    return this.bucketService.removeProductFromBucket(userId, dto);
  }
}
