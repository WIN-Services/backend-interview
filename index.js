const express = require("express");
const BaseError = require('./server/utils/Errors');
require("dotenv").config();
require('./server/config/mongo');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const apiRoutes = require("./server/routes");
app.use("/api", apiRoutes);

// Error Handling
process.on('unhandledRejection', async (reason, p) => {
  const msg = reason.message ? reason.message : reason;
  console.trace('unhandledRejection', msg, reason);
});

process.on('uncaughtException', async (error) => {
  console.trace('uncaughtException', error);
});

async function errorHandler(err, req, res, next) {
  const e = BaseError.handleMongooseValidation(err);
  if (err.statusCode) res.status(err.statusCode);
  else res.status(500);

  return res.json({
    code: err.code || 500,
    message: e instanceof BaseError ? e.message : 'Something went wrong!',
    result: undefined,
  });
}

app.use(errorHandler);

// 404 error
app.all("*", (req, res, next) => {
  const err = new BaseError({code: 404, message: "Endpoint Not Found", statusCode: 404});
  next(err);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
