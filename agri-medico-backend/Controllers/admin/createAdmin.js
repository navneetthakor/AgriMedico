// to connect with user Collection 
const Admin = require('../../Model/Admin');

// to validate body params 
const {validationResult} = require('express-validator');

// to provide authtoken (for digital signature) 
const jwt = require('jsonwebtoken');

// to encrypt the password 
const bcrypt = require('bcryptjs');

// to delete image 
const fs = require('fs');
const path = require('path');

const createAdmin = async(req,res) => {
    try{

        // checking the given parameters 
        const err =  validationResult(req);
        if(!err.isEmpty()){
            // delete uploaded file 
            if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
            return res.status(400).json({error: err.array(), signal: "red"})
        }
    
        // check wheteher any Admin exists with provided email or not 
        let admin = await Admin.findOne({email: req.body.email});
        if(admin){
            // delete uploaded file 
            if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
            return res.status(400).json({error: "admin with given email already exists", signal: "red"});
        }
    
        // ------Now all set to create admin ------
        // encrypt the password using bcrypt
        const salt = await bcrypt.genSaltSync(10);
        const securePas = await bcrypt.hashSync(req.body.password, salt);
    
        // creating and saving Admin in backend 
        const newAdmin = new Admin({
            image: req.file ? req.file.path : "",
            name: req.body.name,
            email: req.body.email,
            password: securePas,
            contact_num: req.contact_num? req.contact_num : "",
        })
        newAdmin.save();
    
        // jsonwebtoken related 
        // to provide authentication token back to user 
        const data = {
            admin: {
                id: newAdmin._id,
            }
        }
        const jwt_secret = process.env.JWT_SECRET;
        const admintoken = jwt.sign(data,jwt_secret);
        return res.json({admintoken: admintoken, signal: "green"});
    
        }catch(e){
            console.log(e);
    
            // delete uploaded file 
            if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
            res.status(500).json({error: "some error occured", signal: 'red'});
        }
};

module.exports = createAdmin;