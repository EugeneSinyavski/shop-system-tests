import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { BucketModule } from './bucket/bucket.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ProductModule, OrderModule, BucketModule, WarehouseModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
