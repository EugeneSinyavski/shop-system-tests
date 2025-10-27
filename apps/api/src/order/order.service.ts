import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderDto } from 'dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: number, dto: CreateOrderDto) {
    const productIds = dto.items.map((item) => item.product_id);

    const productsFromDb = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (productsFromDb.length !== productIds.length) {
      throw new NotFoundException('One or more products were not found');
    }

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.ordering.create({
        data: {
          user_id: userId,
          status: 'PENDING',
          orderDate: new Date(),
        },
      });

      const orderItemsData = dto.items.map((item) => {
        const product = productsFromDb.find((p) => p.id === item.product_id);

        if (!product) {
          throw new NotFoundException(`Product with ID ${item.product_id} not found`);
        }

        const totalCost = product.price.toNumber() * item.quantity;

        return {
          ordering_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          totalCost: totalCost,
        };
      });

      await tx.productInOrder.createMany({
        data: orderItemsData,
      });

      const bucket = await tx.bucket.findFirst({ where: { user: { id: userId } } });
      if (bucket) {
        await tx.productsInBuckets.deleteMany({
          where: { bucket_id: bucket.id },
        });
      }

      return { orderId: order.id };
    });
  }

  async findOrdersByUserId(userId: number) {
    return this.prisma.ordering.findMany({
      where: { user_id: userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updateOrderStatus(orderId: number, dto: UpdateOrderDto) {
    return this.prisma.ordering.update({
      where: { id: orderId },
      data: { status: dto.status }
    });
  }
}