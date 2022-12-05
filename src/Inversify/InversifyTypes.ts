export const INVERSIFY_TYPES = {
  // Auth
  AuthenticationService: Symbol.for('AuthenticationService'),

  // logging
  Logger: Symbol.for('Logger'),

  // AWS
  S3Service: Symbol.for('S3Service'),
  AuditLogger: Symbol.for('AuditLogger'),
  Mail: Symbol.for('Mail'),

  // Others
  LocalizeService: Symbol.for('LocalizeService'),

  // Database
  Database: Symbol.for('Database'),
  DbName: Symbol.for('DB_NAME'),

  // Datastores
  OrderDatastore: Symbol.for('OrderDatastore'),

  // Repositories
  OrderManagementRepository: Symbol.for('OrderManagementRepository'),

  // Middlewares
  RequestOrderMiddleware: Symbol.for('RequestOrderMiddleware'),
  UpdateOrderMiddleware: Symbol.for('UpdateOrderMiddleware'),
  AuthMiddleware: Symbol.for('AuthMiddleware'),
  ErrorMiddleware: Symbol.for('ErrorMiddleware'),
  LoggerMiddleware: Symbol.for('LoggerMiddleware'),
  LocalizeMiddleware: Symbol.for('LocalizeMiddleware'),
  LoginUserMiddleware: Symbol.for('LoginUserMiddleware'),
  UploadFileValidationMiddleware: Symbol.for('UploadFileValidationMiddleware'),

  // Controllers
  Controller: Symbol.for('Controller'),

  // Server
  Server: Symbol.for('Server')
};
