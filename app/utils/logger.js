const currentDateTime = new Date();
const logger = {
  info: (message) => {
    return console.log(`${currentDateTime} | log=info |  message=${message}`);
  },
  error: (message) => {
    return console.log(`${currentDateTime} | log=error |  message=${message}`);
  },
  warn: (message) => {
    return console.log(`${currentDateTime} | log=warn |  message=${message}`);
  },
};
module.exports = logger;
