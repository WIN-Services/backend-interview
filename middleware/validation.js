const orders = require('../Models/Orders');

exports.validateTime = async (req,res,next) => {
    try{
    await orders.findAll({
        limit: 1,
        order: [ [ 'createdAt', 'DESC' ]],
        raw : true
      }).then((response) => {
        Date.prototype.addHours= function(h){
            this.setHours(this.getHours()+h);
            return this;
        }
        const time = response[0].updatedAt.addHours(3).getTime()
        console.log(time)
        if(new Date().getTime() > time){
            req.canBeCreated =  false 
            next();
        }
        else{
            req.canBeCreated =  false 
            next();
        }
    })
    }
    catch {
        (err) => {
            console.log(err);
        }
    }
}