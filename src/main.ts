import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from './shared/config/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<AppConfigService>(AppConfigService);
  const { port } = configService;
  await app.listen(port, async () => {
    // eslint-disable-next-line no-console
    console.info(`Listening on port ${port}`);
  });
}
bootstrap();
