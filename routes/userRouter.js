var express = require('express');
const auth = require('../middleware/auth');
var router = express.Router();
const User = require('../models/User')
router.post("/register", (req,res)=>{
    const {email, password, passwordConfirm} = req.body
    User.findOne({ email: email })
    .then(user=>{
        if(user){
            console.log("USER:> ", user)
            res.json({msg:"Already exists!!!!!!"})
        }else{
            const newUser = new User({
                email,
                password
            })
            newUser.save()
            res.json("New User Created")
        }
    })
})
router.post("/login", (req,res)=>{
    const {email, password} = req.body
    User.findOne({ email: email })
    .then(user=>{
        if(user){
            if(user.password===password){
                console.log("Logging in...")
                res.cookie("user_id", user.id)
                res.json({msg:"Logged in!"})
            }else{
                res.json({msg:"Password unmatch!"})
            }
        }
        else{
            res.json({msg:"Invalid email, please enter a valid email!"})
        }
    })
})
router.get("/test",auth ,(req,res)=>{
    res.send("Working")
})
  module.exports = router;