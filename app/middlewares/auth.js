require('dotenv').config();
const { verify } = require("jsonwebtoken");

async function verifyUser(req, res, next) {
    const clientIp = req.ip;
    try {
        const accessToken = (req.headers['authorization'] || req.headers['Authorization']) || undefined;
        if (!accessToken) {
            return res.status(401).send('Token Not Provided');
        }
        // verify token with JWT_SECRET_KEY
        verify(accessToken, process.env.JWT_SECRET_KEY);

        // TODO://validate user using further authentication/authorization as per requirement...
        return next();
    } catch (error) {
        return res.sendStatus(401);
    }
}

module.exports = {
    verifyUser
}