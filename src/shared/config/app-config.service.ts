import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PoolConfig } from 'pg';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  getKeyFromConfig = (key: string) => this.configService.get(key);

  get port() {
    return this.getKeyFromConfig('port') || 4000;
  }

  get databaseConfig(): PoolConfig {
    return {
      host: this.getKeyFromConfig('DB_HOST'),
      port: this.getKeyFromConfig('DB_PORT'),
      user: this.getKeyFromConfig('DB_USER'),
      password: this.getKeyFromConfig('DB_PASSWORD'),
      database: this.getKeyFromConfig('DB_DBNAME'),
    };
  }
}
