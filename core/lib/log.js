const log4js = require("log4js");

log4js.configure({
  appenders: {
    console: {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%d %p %c %m%n",
      },
    },
    file: {
      type: "dateFile",
      backup: 100,
      maxLogSize: 10485760,
      pattern: ".dd-MM-yyyy",
      filename: "logs/order-api.log",
      compress: true,
      layout: {
        type: "pattern",
        pattern: "%d %p %c %m%n",
      },
    },
  },
  categories: {
    default: {
      appenders: ["console"],
      level: process.env.LOG_LEVEL || 'info',
    },
  },
});

module.exports = {
  logger: log4js.getLogger("orders-api"),
};
