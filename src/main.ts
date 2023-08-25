import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import helmet from '@fastify/helmet';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
    { bufferLogs: true, bodyParser: true, rawBody: true },
  );

  const configService = app.get(ConfigService);
  const PORT = configService.get('port');

  const logger = new Logger();

  await app.register(helmet);
  app.useLogger(logger);
  app.useGlobalInterceptors();
  app.enableShutdownHooks();
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await app.listen(PORT, '0.0.0.0');

  logger.log(`Application is running on server: ${await app.getUrl()}`);
}
bootstrap();
