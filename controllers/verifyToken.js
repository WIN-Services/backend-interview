const jwt = require('jsonwebtoken')

const verifyTokenAndAuthenticate = async (req, res, next) => {
    try {
        const { headers: { authorization }, params: { id } } = req;

        if (authorization) {
            const token = authorization.split(' ')[1];

            const result = jwt.verify(token, process.env.JWT_SEC)

            if (result.id === id || result.isAdmin) {
                req.user = result;

                return next();
            }
            res.status(403).json("You are not allowed to do that");
        }

        res.status(401).json("You aren't authenticated");

    } catch (error) {
        res.status(500).json({ errors: error })
    }
}

const verifyTokenAndAdmin = async (req, res, next) => {
    try {
        const { headers: { authorization }, params: { id } } = req;

        if (authorization) {
            const token = authorization.split(' ')[1];

            const result = jwt.verify(token, process.env.JWT_SEC)

            if (result.isAdmin) {
                req.user = result;

                return next();
            }
            res.status(403).json("You are not allowed to do that");
        }

        res.status(401).json("You aren't authenticated");

    } catch (error) {
        res.status(500).json({ errors: error })
    }
}

module.exports = {
    verifyTokenAndAuthenticate,
    verifyTokenAndAdmin
}