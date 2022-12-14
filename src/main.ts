import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1/api');
  app.enableCors({
    origin: process.env.FRONT_END_DEV,
    credentials: true,
  });
  app.use(helmet());
  app.use(cookieParser());
  await app.listen(5003);
}
bootstrap();
