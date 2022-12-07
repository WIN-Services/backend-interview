const Orders=require("../schemas/order.schema");

const getAllOrders=(req,res)=>{
    const orders=Orders.find({},(err,foundOrders)=>{
      if(!err){
        res.json(foundOrders);
      }else{
        console.log(err);
      }
    });
    
}

const addNewOrder=(req,res)=>{
    let {person,fee,service}=req.body;
    let datetime=new Date();
    let time=datetime.getHours();
    let date=datetime.getDate();

   if(person && fee && service){
    let orders=new Orders({person:person,datetime:{date:date, time:time},totalFee:fee,services:service});
    orders.save().then((data)=>res.json(data)).catch(err=>res.json({message:"already exist"}));
    
   }
    
}


const updateOrder=(req,res)=>{
    let {person,fee}=req.body;
    
    if(person){

        let datetime=new Date();
        let time=datetime.getHours();
        let date=datetime.getDate();
        let date1=0;
        let time1=0;
        Orders.find({person:person},(err,foundProd)=>{
            if(err){
                console.log(err)
            }else{
                date1=foundProd[0].datetime.date;
                time1=foundProd[0].datetime.time;
                if((date1-date)==0 && (time-time1)>3){
                    Orders.findOneAndUpdate({person:person},{$set:{totalFee:fee}},(err,foundProd1)=>{
                        if(!err){
                            console.log(foundProd1);
                            res.json({message:"success"});
                        }
                    })
                }else{
                    res.json({message:"Order can not update"});
                };
            }   
    
        });
    }  
}


const deleteOrder=(req,res)=>{
    let {person}=req.body;

Orders.deleteOne({person:person}).then(function(){
    console.log("Data deleted"); 
    res.json({massage:"Success"});// Success
}).catch(function(error){
    res.json({massage:"Not Deleted"}); // Failure
});

}

module.exports={getAllOrders,addNewOrder,updateOrder,deleteOrder};

