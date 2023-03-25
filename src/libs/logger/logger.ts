import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from "nest-winston";
import * as winston from "winston";
//import customtransport from './transport';
const log_path = "log";

export const winstonOptions: WinstonModuleOptions = {
  transports: [
    //new customtransport({}),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.align(),
        nestWinstonModuleUtilities.format.nestLike()
      ),
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.align(),
        nestWinstonModuleUtilities.format.nestLike(),
        winston.format.uncolorize()
      ),
      filename: log_path + "/combined.log",
      level: "info",
    }),
    new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.align(),
        nestWinstonModuleUtilities.format.nestLike(),
        winston.format.uncolorize()
      ),
      filename: log_path + "/error.log",
      level: "error",
    }),
  ],
};
