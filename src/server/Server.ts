import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
// import * as csrf from 'csurf';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import { inject, injectable, multiInject } from 'inversify';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import * as compression from 'compression';
import { ILogger } from '../common/logging/Logger.interface';
import { INVERSIFY_TYPES } from '../Inversify/InversifyTypes';
import { IAuthenticationService } from '../instances/authentication/AuthenticationService.interface';
import { IRouterController } from './controllers/IRouterController';
import { ErrorMiddleware } from './middlewares/ErrorMiddleware';
import { LoggerMiddleware } from './middlewares/LoggerMiddleware';
import { LocalizeMiddleware } from './middlewares/LocalizeMiddleware';
import appConfig from '../config/Index.interface';
import { expressCb } from './middlewares/ExpressCb';

@injectable()
export class Server {
  public readonly app: express.Application;

  constructor(
    @inject(INVERSIFY_TYPES.Logger) private logger: ILogger,
    @inject(INVERSIFY_TYPES.LocalizeMiddleware)
    private localizeMiddleware: LocalizeMiddleware,
    @inject(INVERSIFY_TYPES.LoggerMiddleware)
    private loggerMiddleware: LoggerMiddleware,
    @inject(INVERSIFY_TYPES.ErrorMiddleware)
    private errorMiddleware: ErrorMiddleware,
    @inject(INVERSIFY_TYPES.AuthenticationService)
    private authenticationService: IAuthenticationService,
    @multiInject(INVERSIFY_TYPES.Controller) controllers: IRouterController[]
  ) {
    this.app = express();
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
    this.initializeDoc();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      this.logger.info(`App listening on the port ${process.env.PORT}`);
    });
  }

  private initializeDoc() {
    this.app.use('/images', express.static(`${process.env.NODE_PATH}/src/resources/images`)); // __dir and not _dir
    this.app.use('src/resources/templetes', express.static(`${process.env.NODE_PATH}/src/resources/templetes`)); // __dir and not _dir
    if (process.env.NODE_ENV !== 'production') {
      this.app.use('/doc', express.static(`${process.env.NODE_PATH}/documents/api`));
      this.app.get('/doc', (req, resp) => {
        fs.readFile(`${process.env.NODE_PATH}/documents/api/index.html`, (error, pgResp) => {
          if (error) {
            resp.writeHead(404);
            resp.write('Contents you are looking are Not Found');
          } else {
            resp.writeHead(200, { 'Content-Type': 'text/html' });
            resp.write(pgResp);
          }
          resp.end();
        });
      });
    }
  }

  private initializeMiddleware() {
    const unless =
      (path: string[], middleware: expressCb) =>
      (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (path.includes(req.path)) {
          return next();
        }
        return middleware(req, res, next);
      };

    this.app.use(this.localizeMiddleware.handler());
    // For skip cors
    this.app.use(unless(['/images'], cookieParser()));
    this.app.use(
      unless(
        ['/images'],
        cors({
          origin: appConfig.corsSettings.origin,
          credentials: true,
        })
      )
    );
    this.app.use(unless(['/images'], bodyParser.urlencoded({ extended: true })));
    this.app.use(unless(['/images'], bodyParser.json({ limit: '10mb' })));
    this.app.use(unless([], helmet()));
    this.app.use(compression());
    this.app.use(
      unless(
        [
          '/images',
          '/doc',
          '/auth/csrf-token',
          '/user/register',
          '/user/verifyUser',
          '/user/forgotPassword',
          '/user/resetPassword',
          '/auth/login',
        ],
        this.authenticationMiddleware
      )
    );
    this.app.use(unless(['/images'], this.loggerMiddleware.handler()));
    // this.app.use(unless([], csrf({ cookie: true })));
    const limiter = rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 1000, // limit each IP to 1000 requests per windowMs
    });
    this.app.use(limiter);

    const forgotPasswordLimiter = rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 5, // limit each IP to 5 requests per windowMs
    });
    this.app.use('/user/forgotPassword/', forgotPasswordLimiter);
  }

  private initializeErrorHandling() {
    this.app.use(this.errorMiddleware.handler());
  }

  private initializeControllers(controllers: IRouterController[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  /**
   * Get the user object for the incoming request headers.
   *
   * @param {e.Request} request
   * @param {e.Response} response
   * @param {e.NextFunction} next
   * @returns {Promise<void>}
   */
  private authenticationMiddleware = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    // Record the authenticated user principle in the user context.
    try {
      // Get the user principle from the request headers.
      await this.authenticationService.authenticateRequest(request, response);
    } catch (error) {
      this.logger.error(error);
    }
    next();
  };
}
