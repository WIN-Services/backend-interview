var express = require('express');
var router = express.Router();
const User = require('../models/User')
const Service = require('../models/Service');
const auth = require('../middleware/auth');
//Route to view all services
router.get("/all",auth, (req,res)=>{
    Service.find()
        .then(data=>{
res.json(data)
        })
})
//Route to add services
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
        res.json({msg:"New service added"})
    }else{
        res.json({msg:"You are not an admin"})
    }
})
  module.exports = router;