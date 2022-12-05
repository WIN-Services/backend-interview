import { Container } from 'inversify';
import 'reflect-metadata';
import {
  initialiseLogger,
  initialiseAwsServices,
  initialiseOtherServices,
  initialiseAuthServices,
  initialiseDatastores,
  initialiseRepositories,
  initialiseMiddlewares,
  initialiseControllers,
  initialiseServer,
} from './Inversify/Inversify';
import { INVERSIFY_TYPES } from './Inversify/InversifyTypes';
import { Server } from './server/Server';

export class ServerInit {
  public readonly appServer: Server;

  private inversifyContainer: Container;

  constructor() {
    this.inversifyContainer = this.initInversifyContainer();
    // Create the express server
    this.appServer = this.inversifyContainer.get<Server>(INVERSIFY_TYPES.Server);
  }

  /**
   * Initialise service dependencies
   */
  private initInversifyContainer(): Container {
    const container = new Container();
    initialiseLogger(container);
    initialiseAwsServices(container);
    initialiseOtherServices(container);
    initialiseAuthServices(container);
    initialiseDatastores(container);
    initialiseRepositories(container);
    initialiseMiddlewares(container);
    initialiseControllers(container);
    initialiseServer(container);
    return container;
  }
}
