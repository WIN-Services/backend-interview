const config = require("../../config/index");
const middleware = {
  auth: function (req, res, next) {
    let authRequested =
      (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split("Bearer ")[1]) ||
      undefined;
    let authSaved = config["auth"];
    if (authRequested == authSaved) {
      // Do nothing
      next(null);
    } else {
      res.status(403).json({ err: true, message: "Invalid token" });
    }
  },
};

module.exports = middleware;
