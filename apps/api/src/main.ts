import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173', // Standard port for Vite (React, Vue)
      'http://localhost:3000', // Standard port for Create React App
    ],
    methods: 'GET,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Shop System API')
    .setDescription('API documentation for the "Shop System" project')
    .setVersion('1.0')
    .addTag('auth', 'Authentication and Users')
    .addTag('product', 'Products')
    .addTag('warehouse', 'Warehouses and Inventory')
    .addTag('bucket', 'Bucket')
    .addTag('order', 'Orders')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  const PORT = process.env.PORT ?? 3000;
  await app.listen(PORT);

  console.log(`🚀 Application is running on: http://localhost:${PORT}`);
  console.log(`📚 Swagger docs available at: http://localhost:${PORT}/api-docs`);
}
bootstrap();