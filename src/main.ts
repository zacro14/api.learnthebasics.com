import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(5003);
}
bootstrap();
