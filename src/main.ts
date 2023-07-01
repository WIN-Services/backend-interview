import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Configs } from './config/config';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(Configs().context);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .setTitle('Win Home Inspection OMS')
    .setDescription('Order Management Service for Win home Inspection')
    .setVersion('v1')
    .addBearerAuth()
    .addTag('oms')
    .build();
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(helmet());
  app.enableCors();
  await app.listen(Configs().port, '0.0.0.0');
}
bootstrap();
