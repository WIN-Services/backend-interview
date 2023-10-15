const verifyRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.role) {
            return res.sendStatus(401);
        }
        else if (req.role == allowedRoles) {
            next();
        }
        else {
            return res.sendStatus(403);
        }
    }
}

module.exports = verifyRoles