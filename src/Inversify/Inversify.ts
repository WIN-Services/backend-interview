import { Container } from 'inversify';

import { INVERSIFY_TYPES } from './InversifyTypes';

// Auth
import { IAuthenticationService } from '../instances/authentication/AuthenticationService.interface';
import { AuthenticationService } from '../instances/authentication/AuthenticationService';
import { Mail } from '../instances/mail/Mail';
import { IMail } from '../instances/mail/Mail.interface';

// Logging
import { ILogger } from '../common/logging/Logger.interface';
import { WinstonLogger } from '../common/logging/WinstonLogger';

// AWS
import { IAuditLogger } from '../instances/aws/AuditLogger.interface';
import { StandardAuditLogger } from '../instances/aws/StandardAuditLogger';

// Others
import { ILocalizeService } from '../instances/others/LocalizeService.interface';
import { LocalizeService } from '../instances/others/LocalizeService';

// Datastores
import { OrderDatastore } from '../database/datastores/OrderDatastore';
import { IOrderDatastore } from '../database/datastores/OrderDatastore.interface';
import { IDatabaseConnection } from '../database/instances/DatabaseConnection.interface';
import { ConnectionPool } from '../database/instances/ConnectionPool';

// Repositories
import { OrderManagementRepository } from '../repositories/OrderManagementRepository';
import { IOrderManagementRepository } from '../repositories/OrderManagementRepository.interface';

// Middlewares
import { RequestOrderMiddleware } from '../server/controllers/orderManagementController/RequestOrderMiddleware';
import { AuthMiddleware } from '../server/middlewares/AuthMiddleware';
import { ErrorMiddleware } from '../server/middlewares/ErrorMiddleware';
import { LoggerMiddleware } from '../server/middlewares/LoggerMiddleware';
import { LocalizeMiddleware } from '../server/middlewares/LocalizeMiddleware';

// Controllers
import { OrderManagementController } from '../server/controllers/orderManagementController/OrderManagementController';
import { UpdateOrderMiddleware } from '../server/controllers/orderManagementController/UpdateOrderMiddleware';
import { IRouterController } from '../server/controllers/IRouterController';

// Server
import { Server } from '../server/Server';

/**
 * Initialise Inversify with Interface instances. This will initialise all the auth services.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseAuthServices(container: Container): Container {
  container.bind<IAuthenticationService>(INVERSIFY_TYPES.AuthenticationService).to(AuthenticationService);
  return container;
}

/**
 * Initialise Inversify with Interface instances. This will initialise all the loggers.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseLogger(inversifyContainer: Container): Container {
  inversifyContainer.bind<ILogger>(INVERSIFY_TYPES.Logger).to(WinstonLogger).inSingletonScope();
  return inversifyContainer;
}

/**
 * Initialise Inversify with Interface instances. This will initialise all the AWS services.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseAwsServices(container: Container): Container {
  container.bind<IAuditLogger>(INVERSIFY_TYPES.AuditLogger).to(StandardAuditLogger);
  container.bind<IMail>(INVERSIFY_TYPES.Mail).to(Mail);
  return container;
}

/**
 * Initialise Inversify with Interface instances. This will initialise all the AWS services.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseOtherServices(container: Container): Container {
  container.bind<ILocalizeService>(INVERSIFY_TYPES.LocalizeService).to(LocalizeService);

  return container;
}

/**
 * Initialise Inversify with Interface instances. This will initialise all the datastores.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseDatastores(inversifyContainer: Container): Container {
  inversifyContainer.bind<IOrderDatastore>(INVERSIFY_TYPES.OrderDatastore).to(OrderDatastore);
  inversifyContainer.bind<IDatabaseConnection>(INVERSIFY_TYPES.Database).to(ConnectionPool).inSingletonScope();

  return inversifyContainer;
}

/**
 * Initialise Inversify with Interface instances. This will initialise all the repositores.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseRepositories(container: Container): Container {
  container.bind<IOrderManagementRepository>(INVERSIFY_TYPES.OrderManagementRepository).to(OrderManagementRepository);

  return container;
}

/**
 * Initialise Inversify with Interface instances. This will initialise all the middlewares.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseMiddlewares(container: Container): Container {
  container.bind(INVERSIFY_TYPES.RequestOrderMiddleware).to(RequestOrderMiddleware);
  container.bind(INVERSIFY_TYPES.UpdateOrderMiddleware).to(UpdateOrderMiddleware);
  container.bind(INVERSIFY_TYPES.AuthMiddleware).to(AuthMiddleware);
  container.bind(INVERSIFY_TYPES.ErrorMiddleware).to(ErrorMiddleware);
  container.bind(INVERSIFY_TYPES.LoggerMiddleware).to(LoggerMiddleware);
  container.bind(INVERSIFY_TYPES.LocalizeMiddleware).to(LocalizeMiddleware);
  return container;
}

/**
 * Initialise Inversify with Interface instances. This will initialise all the controllers.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseControllers(container: Container): Container {
  container.bind<IRouterController>(INVERSIFY_TYPES.Controller).to(OrderManagementController);
  return container;
}

/**
 * Initialise Inversify with Interface instances. This will initialise server.
 * @param {Container} container
 * @returns {Container}
 */
export function initialiseServer(container: Container): Container {
  // Server
  container.bind<Server>(INVERSIFY_TYPES.Server).to(Server).inSingletonScope();
  return container;
}
