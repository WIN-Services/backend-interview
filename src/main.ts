import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
