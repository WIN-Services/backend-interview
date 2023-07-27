import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { Order } from './entities/order.entity';
import { Service } from './entities/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm.config.service';
import { DataSource } from 'typeorm';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './common/customExceptions/exception.filter';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [databaseConfig],
          envFilePath: `${process.cwd()}/config/.env.${process.env.NODE_ENV}`,
        }),
        TypeOrmModule.forFeature([Order, Service]),
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
          dataSourceFactory: async (options) => {
            const dataSource = await new DataSource(options).initialize();
            return dataSource;
          },
        }),
      ],
      controllers: [AppController],
      providers: [
        AppService,
        AppService,
        {
          provide: APP_PIPE,
          useValue: new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
          }),
        },
        {
          provide: APP_FILTER,
          useClass: CustomExceptionFilter,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getAllOrders', () => {
    it('should throw a CUSTOM_EXCEPTION with the correct message', async () => {
      expect(async () => {
        await appController.getAllOrders();
      }).rejects.toThrowError('The resource could not be found.');
    });
  });
});
