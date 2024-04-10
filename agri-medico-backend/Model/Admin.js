const mongoose = require('mongoose')
const {Schema, model} = mongoose;

const AdminSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact_num:{
        type: String,
    },
    password:{
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

const Admin = model('admin', AdminSchema)

module.exports = Admin;