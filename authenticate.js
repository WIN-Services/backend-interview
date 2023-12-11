const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
  const token = authHeader.split(' ')[1];
  try {
    const jwtDetails = jwt.decode(token);
    if(jwtDetails.name == process.env.OWNER)
      next();
    else{
      res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
    }

  } catch (error) {
    console.log(error)
    res.status(401).json({
        status: 'fail',
        message: 'Unauthorized!',
      });
  }
};