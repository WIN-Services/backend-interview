import http from "http";
import "express-async-errors";
import { createTerminus } from "@godaddy/terminus";

import logger from "./helper/logger";
import terminus_options from "./helper/functions/terminus";
import normalizePort from "./helper/functions/normalizePort";
import app from "./app";

async function startServer() {
  // Get port from environment and store in Express
  const port = normalizePort(process.env.PORT || 5000);

  // Get host from environment and store in Express
  const host = process.env.HOST || "0.0.0.0";

  app.set("port", port);
  app.set("host", host);

  // Create HTTP server
  const server = http.createServer(app);

  // Event listener for HTTP server "error" event
  const onError = (error: any): void => {
    if (error.syscall !== "listen") throw error;

    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

    // Handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  // Event listener for HTTP server "listening" event
  const onListening = (): void => {
    const addr = server.address();
    const bind =
      typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
    logger.info(`🚀 [${process.env.NODE_ENV}] Listening on ${bind}`);
  };

  createTerminus(server, terminus_options);

  // Listen on provided port, on provided network interface
  server.listen({ host, port });
  server.on("error", onError);
  server.on("listening", onListening);
}

export default startServer;
