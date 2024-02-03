import http from "http";
import bodyParser from "body-parser";
import express, { Application } from "express";
const app = express();
export default class ServerClass {
  constructor() {
    app.use(bodyParser.json({ limit: "100kb" }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
      })
    );
  }

  router(routes: (app: Application) => void): ServerClass {
    routes(app);
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      console.log(`up and running in development on port: ${p}`);

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
