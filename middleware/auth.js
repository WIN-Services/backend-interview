const jwt = require('jsonwebtoken');

const verifyToken = async (req,res,next) => {
    try{
        let token = req.header("Authorization");

        if(!token) return res.status(403).send("Access Denied");

        if (token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trimLeft();
        }
        const jwt_secret = process.env.JWT_SECRET;
        const verified = jwt.verify(token,jwt_secret,"HS256");
        req.user = verified;
        next();
    }catch(error){
        if(error.message) error = error.message;
        return res.status(400).json({"error":error})
    }
}

module.exports = {
    verifyToken
}