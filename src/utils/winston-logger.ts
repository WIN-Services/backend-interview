import * as path from "path";
import * as logger from "winston";

const Logger = logger.createLogger({
  level: "info",
  format: logger.format.printf((info) => `${info.message}`),
  transports: [
    new logger.transports.File({
      filename: path.join(__dirname, "info.log"),
      level: "info",
      maxsize: 500,
    }),
    new logger.transports.Console({
      level: "debug",
      handleExceptions: true,
    }),
  ],
});

export default Logger;
