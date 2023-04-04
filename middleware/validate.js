const {orders} = require('../model/model');

exports.timeCheck = async (req,res,next) => {
    try{
        const mostRecentOrder = await orders.findOne().sort({datetime: 'desc'});
        if (mostRecentOrder) {
            console.log('The most recent order is:', mostRecentOrder);
            recentOrderTime = mostRecentOrder.datetime;
            console.log(recentOrderTime)
            newDateTime = new Date(recentOrderTime.setHours(recentOrderTime.getHours() + 3));
            console.log(newDateTime)
            if(new Date().getTime() > newDateTime){
                    req.canBeCreated =  true 
                    console.log('yes')
                    next();
            }
            else{
                    req.canBeCreated =  false 
                    console.log('no')
                    next();
            }
        }
    }
    catch {
        (err) => {
            console.log(err);
        }
    }
}