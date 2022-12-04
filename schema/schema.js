const mongoose=require('mongoose')

var Schema = mongoose.Schema

var OrderSchema = new Schema({
    id:{
        type: String,
        unique: true
    },
    totalfee:{
        type: Number,
        default:100
    },
    serviceId:[{ 
        type: Schema.Types.ObjectId, ref: 'Service_Log'
    }],
    createdAt:{
        type: Date
    },
    orderName:{
        type: String
    },
    orderType:{
        type: String
    },
    orderQuantity:{
        type: Number
    },
    address:{
        type: String
    },
    pincode:{
        type: Number
    },
    updatedAt:{
        type: Date
    },
    deletionFlag:{
        type: Boolean,
        default: false
    }
});

var ServiceSchema = new Schema({
    serviceId:{
        type: String
    },
    name:{
        type: String
    },
    serviceStatus:{
        type: String,
        default: "In Progress"
    },
    serviceEngineerName:{
        type: String,
        default: 'Mahesh'
    },
    serviceEngineerNumber:{
        type: Number,
        default: 930456790
    }
})


var OrderSchema  = mongoose.model('Order_Log', OrderSchema);
var ServiceSchema  = mongoose.model('Service_Log', ServiceSchema);


module.exports = {
    OrderSchema, ServiceSchema
}