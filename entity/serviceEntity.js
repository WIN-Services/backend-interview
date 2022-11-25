const mongoose = require('mongoose');

const serviceEntity = mongoose.Schema({
    id: String,
    name: String
})

serviceEntity.index({id:1, name:1},{unique:true})

module.exports = mongoose.model('ServiceEntity',serviceEntity);