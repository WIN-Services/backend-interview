const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    if (req.path == "/user/login" || req.path == "/user/register") {
        next();
    }
    else {
        var header = req.headers.authorization || req.headers.Authorization;
        if (!header) return res.sendStatus(401);
        const token = header.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);
            req.user = decoded.UserInfo.email;
            req.role = decoded.UserInfo.role;
            next();
        });
    }
}

module.exports = verifyJWT