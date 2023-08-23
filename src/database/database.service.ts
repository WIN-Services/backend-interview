import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

  async executeQuery(queryText: string, values: any[] = []): Promise<any[]> {
    this.logger.log(`Executing query: ${queryText} (${values})`);
    return await this.pool
      .query(queryText, values)
      .then((result: QueryResult) => {
        this.logger.log(`Executed query, result size ${result.rows.length}`);
        return result.rows;
      });
  }
}
