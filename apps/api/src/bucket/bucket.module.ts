import { Module } from '@nestjs/common';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductModule } from '../product/product.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, ProductModule, AuthModule],
  controllers: [BucketController],
  providers: [BucketService]
})
export class BucketModule {}
