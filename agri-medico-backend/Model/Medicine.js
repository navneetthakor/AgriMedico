const mongoose = require('mongoose')
const {Schema} = mongoose

const MedicineSchema = new Schema({
    
    name:{
        type: String,
        required: true,
    },

    images:[{
        type: String
    }],

    description:{
        type: String,
        default: null,
    },

    urls:[{
        type: String,
    }],

    date:{
        type: Date,
        default: Date.now 
    }

})

const Medicine = mongoose.model('medicine', MedicineSchema)

module.exports = Medicine