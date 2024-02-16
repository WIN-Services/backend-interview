import { Application, ErrorRequestHandler, default as express } from "express";
import { default as cors } from "cors";
import { default as compression } from "compression";
import helmet from "helmet";
import "express-async-errors";
import httpContext from "express-http-context";
import requestLogger from "./middleware/requestLogger";
import { errorHandler, prismaErrorHandler } from "./middleware/error-handler";
import { notFoundHandler } from "./middleware/not-found-handler";
import { generateUniqueId } from "./helper/functions/generateUniqueId";
import logger from "./helper/logger";
import indexRouter from "./routes/indexRouter";

const app: Application = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(requestLogger);
app.use(httpContext.middleware);
app.use((req, res, next) => {
  httpContext.set("requestId", generateUniqueId("REQ").split("-").join(""));
  if (!req.originalUrl.includes("/docs")) {
    logger.info(`Requesting ${req.method} ${req.originalUrl}`, {
      tags: "http",
      additionalInfo: {
        body: req.body,
        headers: req.headers,
        params: req.params,
        query: req.query,
        ip: req.ip,
      },
    });
  }
  next();
});

// routes
const api_doc_config = {
  set_title: "project title",
  set_description: "Rest API documentation for project_name",
  set_version: "1.0.0",
  enabled: true,
};

app.use("/", indexRouter);

// error handler middleware
app.use(prismaErrorHandler as ErrorRequestHandler);
app.use(errorHandler as ErrorRequestHandler);
app.use(notFoundHandler);

export default app;
