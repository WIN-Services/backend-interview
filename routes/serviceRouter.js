var express = require('express');
var router = express.Router();
const User = require('../models/User')
const Service = require('../models/Service');
const auth = require('../middleware/auth');
router.get("/all",auth, (req,res)=>{
    Service.find()
        .then(data=>{
res.json(data)
        })
})
router.post("/addservice",auth,(req,res)=>{
    const user = User.findById(req.cookies.user_id)
    if(user.email===process.env.AdminEmail){
        const {name, cost, index} = req.body
        const service = new Service({
            name,
            cost,
            index
        })
        service.save()
        res.json({msg:"Added New Service"})
    }else{
        res.json({msg:"Not an admin"})
    }
})
  module.exports = router;