const errorHandler = (err, req, res, next) => {
  const errCode = err.code || 500;
  const message = err.message || 'Something went wrong';
  return res.status(errCode).json({ message });
};

module.exports = errorHandler;
