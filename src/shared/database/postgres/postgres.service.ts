import { Inject, Injectable } from '@nestjs/common';
import { Pool, QueryResultRow } from 'pg';

@Injectable()
export class PostgresService {
  constructor(@Inject('PG_CONNECTION') private readonly pool: Pool) {}

  query<
    Response extends QueryResultRow = any,
    Parameters extends any[] = any[],
  >(query: string, parameters?: Parameters) {
    return this.pool.query<Response, Parameters>(query, parameters);
  }
}
