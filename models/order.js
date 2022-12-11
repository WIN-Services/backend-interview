const mongoose = require('mongoose');
const ObjectId=mongoose.Schema.Types.ObjectId


//OrderSchema
const OrderSchema = mongoose.Schema({

    
     createdAt:{
        type: Date,
        default:Date.now,

      },
     totalfee: {
        type: Number,
        required: true,
      },
     services: [
        {
          type:ObjectId,
          ref: "service",
        },
      ],
   
    
});

// QUERY MIDDLEWARE
    OrderSchema.pre(/^find/, function(next) {
     
        this.datetime = new Date().toISOString()
        next();
      });


 



const Order = module.exports = mongoose.model('order', OrderSchema);
