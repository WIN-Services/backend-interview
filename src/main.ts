import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "./env";
import { HttpExceptionFilter } from "./exceptions/http-exception-filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix(env.app.routePrefix || "/v1");
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: ["http://localhost:3002", "*"],
    credentials: true,
  });
  console.log("PREFIX: ", env.app.routePrefix);
  await app.listen(env.app.port || 4014);
}
bootstrap();
