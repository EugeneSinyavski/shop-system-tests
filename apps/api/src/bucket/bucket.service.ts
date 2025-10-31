import { Injectable } from '@nestjs/common';
import { UpdateBucketDto } from 'dto';
import { PrismaService } from '../prisma/prisma.service';
import { BucketNotFoundException } from '../common/exceptions/bucket-not-found.exception';
import { ProductService } from '../product/product.service';
import { ProductNotFoundException } from '../common/exceptions/product-not-found.exception';

@Injectable()
export class BucketService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductService) {}

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
      throw new BucketNotFoundException(userId);
    }
    return bucket;
  }

  async addProductToBucket(userId: number, dto: UpdateBucketDto) {
    const bucket = await this.findBucketByUserId(userId);

    await this.productService.findProductById(dto.productId);

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

    const itemInBucket = await this.prisma.productsInBuckets.findUnique({
      where: {
        product_id_bucket_id: {
          product_id: dto.productId,
          bucket_id: bucket.id
        }
      }
    });

    if (!itemInBucket) {
      throw new ProductNotFoundException(dto.productId);
    }

    return this.prisma.productsInBuckets.delete({
      where: {
        product_id_bucket_id: {
          bucket_id: bucket.id,
          product_id: dto.productId,
        },
      },
    });
  }
}