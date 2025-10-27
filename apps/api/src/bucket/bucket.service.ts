import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBucketDto } from 'dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BucketService {
  constructor(private prisma: PrismaService) {}

  async findBucketByUserId(userId: number) {
    const bucket = await this.prisma.bucket.findFirst({
      where: {
        user: { id: userId },
      },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!bucket) {
      throw new NotFoundException(`Bucket for user ${userId} not found`);
    }
    return bucket;
  }

  async addProductToBucket(userId: number, dto: UpdateBucketDto) {
    const bucket = await this.findBucketByUserId(userId);

    return this.prisma.productsInBuckets.upsert({
      where: {
        product_id_bucket_id: {
          bucket_id: bucket.id,
          product_id: dto.productId,
        },
      },
      update: {},
      create: {
        bucket_id: bucket.id,
        product_id: dto.productId,
      },
    });
  }

  async removeProductFromBucket(userId: number, dto: UpdateBucketDto) {
    const bucket = await this.findBucketByUserId(userId);

    return this.prisma.productsInBuckets.deleteMany({
      where: {
        bucket_id: bucket.id,
        product_id: dto.productId,
      },
    });
  }
}