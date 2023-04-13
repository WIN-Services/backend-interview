import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus, VersioningType } from '@nestjs/common';
import { Configs } from './config/config';
import { GlobalExceptionFilter } from './errors/custom.errors';
import helmet from 'helmet';
import { GlobalResponseInterceptor } from './common/response-interceptors';
import { checkCors } from './utils/cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    cors: {
      origin: (origin, callback) => {
        if (!origin || checkCors(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Origin not allowed by CORS'));
        }
      },
      methods: 'GET ,PUT, PATCH,POST,DELETE,OPTIONS',
      allowedHeaders:
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
      optionsSuccessStatus: HttpStatus.OK,
      preflightContinue: false,
    },
  });
  app.setGlobalPrefix(Configs().name);
  app.enableVersioning({
    // defaultVersion: '1',
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .setTitle('Win Order Management Service')
    .setDescription('Win Order Management Service')
    .setVersion('v1')
    .addTag('oms')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(helmet());
  app.enableCors();
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalInterceptors(new GlobalResponseInterceptor());
  await app.listen(Configs().port, '0.0.0.0');
}

bootstrap();
