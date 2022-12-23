var express = require('express');
const auth = require('../middleware/auth');
var router = express.Router();
const User = require('../models/User')
//Register Route
router.post("/register", (req,res)=>{
    const {email, password, passwordConfirm} = req.body
    User.findOne({ email: email })
    .then(user=>{
        if(user){
            console.log("USER:> ", user)
            res.json({msg:"User already exists!"})
        }else{
            const newUser = new User({
                email,
                password
            })
            newUser.save()
            res.json("User created")
        }
    })
})
//Login Route
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
                res.json({msg:"Password does not match!"})
            }
        }
        else{
            res.json({msg:"Enter a valid email!"})
        }
    })
})
router.get("/test",auth ,(req,res)=>{
    res.send("WORKING")
})
  module.exports = router;