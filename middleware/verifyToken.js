require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyToken = async (req, res) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  try {
    if (!token) {
      throw new Error("Authorization Token Is Missing");
      return;
    } else {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      req.info = decoded;
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized token" });
    process.exit(0);
  }
};

const isAdmin = async (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    await verifyToken(req, res);
    next();
  }
  else {
    await verifyToken(req, res);
    if (!req?.info?.isAdmin) {
      res.status(401).json({ error: "Cannot access this api due lack of adminstartor rights" });
      return;
    }
    next();
  }
};
module.exports = { isAdmin };
