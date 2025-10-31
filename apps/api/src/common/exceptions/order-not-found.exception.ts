import { NotFoundException } from '@nestjs/common';

export class OrderNotFoundException extends NotFoundException {
  constructor(orderId: number) {
    super(`Order with ID ${orderId} not found`);
  }
}