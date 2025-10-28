import { NotFoundException } from '@nestjs/common';

export class BucketNotFoundException extends NotFoundException {
  constructor(userId: number) {
    super(`Bucket not found for user with ID ${userId}`);
  }
}