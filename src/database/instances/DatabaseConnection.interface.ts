import { Connection, EntityManager } from 'typeorm';

export interface IDatabaseConnection {
  usingConnection<TReturnType>(doAction: (connection: Connection) => Promise<TReturnType>): Promise<TReturnType>;

  usingTransaction<TReturnType>(doAction: (transaction: EntityManager) => Promise<TReturnType>): Promise<TReturnType>;

  close(): Promise<void>;
}
