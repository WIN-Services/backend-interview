import * as bodyParser from "body-parser";
import * as cors from 'cors';
import * as express from "express";
import * as routes from './routes/_index';

class App {
  public app: express.Express;
  
  
  constructor() {
    this.app = express();
    this.config();
    routes.initRoutes(this.app)

  }

  private config(): void {   
    this.app.use(cors({
        optionsSuccessStatus: 200
    }))
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
}

export default new App().app;