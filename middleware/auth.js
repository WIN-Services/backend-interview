const User = require("../models/User")
module.exports = function (req,res,next){
    console.log("Middleware", req.cookies)
    User.findById(req.cookies.user_id)
    .then(result=>{
        if(result){
            console.log("User is authenticated!")
            next()
        }else{
            res.json({msg:"User not logged in!"})
        }
    })
}
