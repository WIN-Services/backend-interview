import { inject, injectable, optional } from 'inversify';
import { Connection, EntityManager } from 'typeorm';
import { Exception } from '../../common/exceptions/Exception';
import { ILogger } from '../../common/logging/Logger.interface';
import { INVERSIFY_TYPES } from '../../Inversify/InversifyTypes';
import { IDatabaseConnection } from './DatabaseConnection.interface';
import { DatabaseConnection } from './DatabaseConnection';
import { ILocalizeService } from '../../instances/others/LocalizeService.interface';

interface IConnectionUse {
  timeCreated: number;
  connection: DatabaseConnection;
}

@injectable()
export class ConnectionPool implements IDatabaseConnection {
  private static MAX_FREE_CONNECTIONS = 2;

  private connectionCount = 0;

  private freeConnections: IConnectionUse[] = [];

  private isClosed = false;

  constructor(
    @inject(INVERSIFY_TYPES.Logger) private logger: ILogger,
    @inject(INVERSIFY_TYPES.LocalizeService) private localize: ILocalizeService,
    @inject(INVERSIFY_TYPES.DbName) @optional() private dbName?: string
  ) {}

  /**
   * Close all connections in the pool and stops the pool from opening new connections
   */
  public async close() {
    this.isClosed = true;
    await Promise.all(
      this.freeConnections.map(async o => {
        try {
          await o.connection.close();
        } catch (err) {
          this.logger.error('TypeormConnectionPool (close) - Failed to close database connection', err);
        }
      })
    );
  }

  /**
   * Opens the connection pool to allow new connections to be created. The
   * connection pool is open by default, use this function to reopen the
   * connection if it was previously closed.
   */
  public open() {
    this.isClosed = false;
  }

  /**
   * Use a free connection from the pool or create a new connection to
   * carry out the specified action.
   *
   * @param doAction  The action to perform using the database connection.
   */
  public async usingConnection<TReturnType>(
    doAction: (connection: Connection) => Promise<TReturnType>
  ): Promise<TReturnType> {
    if (this.isClosed) {
      throw new Exception(500, 'The database connection pool is closed');
    }
    // Use a free connection or create a new one in none are available
    let freeConnection = this.freeConnections.pop();
    if (!freeConnection) {
      // Create a new connection
      freeConnection = {
        timeCreated: Date.now(),
        connection: new DatabaseConnection(this.logger, this.localize, this.dbName),
      };
      // Log the open DB connection count
      this.connectionCount += 1;
      this.logger.info(
        `TypeormConnectionPool (usingConnection) - New database connection. Connection count: ${this.connectionCount}`
      );
    }
    // Execute the query then free the connection
    try {
      return await freeConnection.connection.usingConnection(doAction);
    } finally {
      // If there are no connections free or the connection has been used
      // recently and the maximum pool size has not been reached then keep
      // the connection. This avoids closing the connection when the server
      // is busy.
      if (
        !this.isClosed &&
        (this.freeConnections.length === 0 ||
          (this.freeConnections.length < ConnectionPool.MAX_FREE_CONNECTIONS &&
            Date.now() - freeConnection.timeCreated < 1000))
      ) {
        this.freeConnections.push(freeConnection);
      } else {
        // Log the open DB connection count
        this.connectionCount -= 1;
        this.logger.info(
          `TypeormConnectionPool (usingConnection) - Close connection database connection. Connection count: ${this.connectionCount}`
        );
        // Remove the connection
        try {
          await freeConnection.connection.close();
        } catch (err) {
          this.logger.error(
            'TypeormConnectionPool (usingConnection) - Failed to close database connection but the connection will no longer be used by the pool',
            err
          );
        }
      }
    }
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
}
