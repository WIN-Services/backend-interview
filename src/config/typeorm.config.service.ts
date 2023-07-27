import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('database.type'),
      host: this.configService.get('database.host'),
      port: this.configService.get('database.port'),
      database: this.configService.get('database.database'),
      username: this.configService.get('database.username'),
      synchronize: this.configService.get('database.synchronize'),
      password: this.configService.get<string>('database.password'),
      dropSchema: false,
      logging: this.configService.get('app.nodeEnv') !== 'production',
      entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/{*.ts,*.js}'],
      extra: {
        max: this.configService.get('database.maxConnections'),
      },
    } as TypeOrmModuleOptions;
  }
}
