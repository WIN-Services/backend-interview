import { inject, injectable, optional } from 'inversify';
import { Connection, createConnection, EntityManager } from 'typeorm';
import { Exception } from '../../common/exceptions/Exception';
import { ILogger } from '../../common/logging/Logger.interface';
import { INVERSIFY_TYPES } from '../../Inversify/InversifyTypes';
import AppConfig from '../../config/Index.interface';

import { IDatabaseConnection } from './DatabaseConnection.interface';
import { ILocalizeService } from '../../instances/others/LocalizeService.interface';

@injectable()
export class DatabaseConnection implements IDatabaseConnection {
  private connection?: Connection;

  constructor(
    @inject(INVERSIFY_TYPES.Logger) private logger: ILogger,
    @inject(INVERSIFY_TYPES.LocalizeService)
    private localize: ILocalizeService,
    @inject(INVERSIFY_TYPES.DbName)
    @optional()
    private dbName?: string
  ) {}

  /**
   * Attempt a database query using a new connection, retry that connection
   * if the database connection fails whilst executing the query.
   *
   * @param doAction  The database action to perform
   */
  public async usingConnection<TReturnType>(
    doAction: (connection: Connection) => Promise<TReturnType>
  ): Promise<TReturnType> {
    const maxRetries = 1;
    let attempt = 1;
    while (attempt <= maxRetries) {
      attempt += 1;
      // Force a new connection if this is the second attempt
      const connection = await this.getConnection(attempt > 2);
      try {
        return await doAction(connection);
      } catch (err) {
        if (err && err.message === 'Connection terminated unexpectedly') {
          this.logger.info(`Retrying connection. Attempt ${attempt} of ${maxRetries}`);
          continue;
        }
        throw err;
      }
    }
    throw new Exception(500, 'Failed to complete action');
  }

  /**
   * Start a database transaction to perform batch database operations
   * @param doAction
   */
  public async usingTransaction<TReturnType>(
    doAction: (transaction: EntityManager) => Promise<TReturnType>
  ): Promise<TReturnType> {
    return this.usingConnection((connection: Connection) => connection.transaction(async trx => doAction(trx)));
  }

  /**
   * Attempt to connect to the database if a connection isn't already established.
   *
   * @param forceNew  Don't use an existing connection
   * @return  The database connection
   */
  public async getConnection(forceNew: boolean = false): Promise<Connection> {
    if (forceNew || this.connection === undefined || !this.connection.isConnected) {
      this.connection = await this.retryConnect();
    }
    return this.connection;
  }

  /**
   * Close the database connection
   */
  public async close() {
    if (this.connection) {
      await this.connection.close();
    }
  }

  /**
   * Attempt to connect to the database, retry on connection failures
   *
   * @param maxRetries  Maximum number of retry attempts
   * @param delayMs      The delay before retry the connection
   * @return The database connection
   */
  private async retryConnect(maxRetries = 12, delayMs = 5000): Promise<Connection> {
    let connection: Connection | undefined;
    let attempt = 1;
    while (!connection && attempt <= maxRetries) {
      attempt += 1;
      try {
        connection = await this.connect();
      } catch (err) {
        this.logger.error(err.message, err);
        switch (err.code) {
          case '28P01':
            throw new Exception(500, this.localize.getLocalizationMessage('CannotConnectToDatabaseInvalidCred'));
          case 'ECONNREFUSED':
          case 'EACCES':
          case 'ENOTFOUND':
            if (attempt > maxRetries) {
              throw new Exception(
                500,
                this.localize.getLocalizationMessage('CannotConnectToDatabaseConnectionAddress')
              );
            }
            this.logger.info(`Retrying connection in ${delayMs} milleseconds. Attempt ${attempt} of ${maxRetries}`);
            await DatabaseConnection.delay(delayMs);
            continue;
          default:
            throw new Exception(500, this.localize.getLocalizationMessage('CannotConnectToTheDatabase'));
        }
      }
    }
    if (!connection) {
      throw new Exception(500, this.localize.getLocalizationMessage('CannotConnectToTheDatabase'));
    }
    return connection;
  }

  /**
   * Attempt the database connection
   */
  private async connect(): Promise<Connection> {
    // Use the specified or configured DB Name, use the constructor
    // DB name as a priority to allow overrides
    const dbName = this.dbName || AppConfig.ormconfig.database;

    return createConnection({
      type: 'mysql',
      name: `${Date.now()}`,
      host: AppConfig.ormconfig.host,
      port: AppConfig.ormconfig.port,
      username: AppConfig.ormconfig.username,
      password: AppConfig.ormconfig.password,
      database: dbName,
      entities: ["src/database/entities/*ts"],
      synchronize: false,
      logging: AppConfig.ormconfig.logging,
    });
  }

  /**
   * delay the current execution path for a specified number of milliseconds
   *
   * @param delayMs  The delay in milliseconds
   */
  private static async delay(delayMs: number): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
      setTimeout(resolve, delayMs);
    });
  }
}
