var express = require('express');
var router = express.Router();
const User = require('../models/User_model')
const Service = require('../models/Service_model');
const auth = require('../middleware/auth');
router.get("/all",auth, (req,res)=>{
    Service.find()
        .then(data=>{
res.json(data)
        })
})
//To add new service
router.post("/addservice",auth,(req,res)=>{
    const user = User.findById(req.cookies.user_id)
        const {name, cost, index} = req.body
        const service = new Service({
            name,
            cost,
            index
        })
        service.save()
        res.json({msg:"Service is added"})
})
  module.exports = router;