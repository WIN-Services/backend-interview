const mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')
var userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required: true
    },
    orders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }]
})
userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);
