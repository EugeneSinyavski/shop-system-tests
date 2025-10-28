import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, OrderStatus, UpdateOrderDto } from 'dto';
import { OrderProductNotFoundException } from '../common/exceptions/order-product-not-found.exception';
import { ProductNotFoundException } from '../common/exceptions/product-not-found.exception';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: number, dto: CreateOrderDto) {

    const productsFromDb = await this._validateProductsExist(dto);

    return this.prisma.$transaction(async (tx) => {
      const order = await tx.ordering.create({
        data: {
          user_id: userId,
          status: OrderStatus.PENDING,
          orderDate: new Date(),
        },
      });

      await this._createOrderItems(tx, order.id, dto, productsFromDb);

      await this._clearUserBucket(tx, userId);

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

  private async _validateProductsExist(dto: CreateOrderDto): Promise<Product[]> {
    const productIds = dto.items.map((item) => item.product_id);
    const productsFromDb = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (productsFromDb.length !== productIds.length) {
      throw new OrderProductNotFoundException();
    }
    return productsFromDb;
  }

  private async _createOrderItems( tx: any, orderId: number, dto: CreateOrderDto, productsFromDb: Product[] ){
    const orderItemsData = dto.items.map((item) => {
      const product = productsFromDb.find((p) => p.id === item.product_id);

      if (!product) {
        throw new ProductNotFoundException(item.product_id);
      }

      const totalCost = product.price.toNumber() * item.quantity;
      return {
        ordering_id: orderId,
        product_id: item.product_id,
        quantity: item.quantity,
        totalCost: totalCost,
      };
    });

    await tx.productInOrder.createMany({
      data: orderItemsData,
    });
  }

  private async _clearUserBucket(tx: any, userId: number) {
    const bucket = await tx.bucket.findFirst({ where: { user: { id: userId } } });
    if (bucket) {
      await tx.productsInBuckets.deleteMany({
        where: { bucket_id: bucket.id },
      });
    }
  }
}