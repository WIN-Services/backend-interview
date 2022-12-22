const express = require('express')
const router = express.Router()
const db = require('../db/dbOperations')


//retriving all the orders
router.get('/',async (req,res,next)=>{
    try{
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log('URL : '+fullUrl)
        orderRecords = await db.showData()
        console.log('record orders : '+typeof orderRecords)
        res.status(200).send(orderRecords)
    }catch(err){
        console.log('error get all orders : '+err)
    }
})

//retriving a particular oredr ID
router.get('/:id',async(req,res,next)=>{
    try{
        const id = req.params.id
        
        orderRecords = await db.showData(id)
        res.status(200).send(orderRecords)
    }catch(err){
        console.log('error occurred!'+err)
    }
})

//create an order
router.post('/',async(req,res,next)=>{
    try{
        var result = ''
        var create = false
        var checkServices = await db.checkServices(req.body.services)
        var checkDate = await db.dateCheck(req.body.id)
        if(checkServices){
            if(checkDate.idExists){
               //comapre time 
               var currentTime = new Date()
               currentTime = currentTime.getTime()
               var threeHours = 120000
               console.log('difference : '+(currentTime - checkDate.dateFound))
               console.log('current time : '+currentTime+' : time found : '+checkDate.dateFound)
               if(currentTime - checkDate.dateFound < threeHours){
                    res.status(503).send('try again after 3 hours')
               }else{
                    create = true
               }
            
            }else{
                //create the request
                create = true
            }
            if(create){
                var reqdate = new Date(req.body.dateTime)
                reqDate = reqdate.getTime()
                if(isNaN(reqDate)){
                    res.status(406).send('date format is not accecptable')
                }else{
                        
                    var result = await db.addOrder(req.body)
                    res.status(200).send(result)
                }
            }
        }
    }catch(err){
        res.status(500).send(err)
        console.log('error occurred creating order'+err)
    }
})

//update an order
router.put('/',async(req,res,next)=>{
    try{
        var result = ''
        var checkServices = await db.checkServices(req.body.services)
        var checkDate = await db.dateCheck(req.body.id)
        
        console.log('check services : '+JSON.stringify(checkServices))
        console.log('check date : '+JSON.stringify(checkDate))

        if(checkDate.idExists && checkServices){
            result = await db.updateRow(req.body,checkDate.dateFound)
        }else{
            //id doesnot exist
            res.status(400).send("id doesnot exist")
        }
        
        console.log('result : '+result)
        res.status(result.status).send(result.message)
    }catch(err){
        console.log('error updation :'+JSON.stringify(err))
        res.status(err.status).send(err.message)
    }
})

//delete an order
router.delete('/:id',async (req,res)=>{
    try{        
        const id = req.params.id
        var result = ''
        var checkDate = await db.dateCheck(id)
        console.log('check date : '+JSON.stringify(checkDate))
        if(checkDate.idExists){
            result = await db.deleteRow(id,checkDate.dateFound)
        }else{
            res.status(400).send("id does not exist")
        }
        res.status(result.status).send(result.message)
    }catch(err){
        res.status(500).send(err)
    }
})

module.exports = router