import { TerminusOptions } from "@godaddy/terminus";
import logger from "../logger";

const terminus_options = {
  // Server health endpoint
  // Promise should resolve if ok, reject on error (e.g., cannot connect to database)
  healthChecks: {
    "/health": (): Promise<void> => new Promise((resolve) => resolve()),
    verbatim: true,
    __unsafeExposeStackTraces: true,
  },
  statusOk: 200,
  timeout: 1000,
  // Listen for these signals
  // SIGUSR2 is sent by Nodemon
  signals: ["SIGTERM", "SIGINT", "SIGUSR1", "SIGUSR2"],
  // Event listener for Terminus "signal" event
  onSignal(): Promise<void> {
    return new Promise((resolve) => {
      // Terminus will call server.close for you using the stoppable package
      logger.info(`server is starting cleanup`);
      return resolve();
    });
  },
  onShutdown(): Promise<void> {
    return new Promise((resolve) => {
      // Terminus will call server.close for you using the stoppable package
      logger.info(`server is shutting down`);
      return resolve();
    });
  },
} as TerminusOptions;

export default terminus_options;
