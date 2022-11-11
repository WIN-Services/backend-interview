const ErrorResponse=require('../helper/errorResponse');

const errorHandler = (err,req,res,next) => {

    let error={...err}
    error.message=err.message;

    //log to console for dev

    console.log(err.stack);


    //mongoose bad object Id
    //console.log(err.name);
    if(err.name==='CastError'){
        const message=`Resource is not Found With id ${err.value}`;
        error=new ErrorResponse(message,404);
    }

    //mongoose duplicate key error
    if(err.code===11000){
        const message=`Duplicate Field Value Entered `;
        error=new ErrorResponse(message,400);
    }

    console.log(err);
    //Validation Error => if you are not sending the required fields

    if(err.name==='ValidationError'){
        const message=Object.values(err.errors).map(val=>val.message);
        error=new ErrorResponse(message,400);
    }
    

    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || 'Server Error'
    });
}

module.exports=errorHandler;