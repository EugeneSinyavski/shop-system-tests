import { NotFoundException } from '@nestjs/common';

export class OrderProductNotFoundException extends NotFoundException {
  constructor() {
    super('One or more products included in the order were not found');
  }
}