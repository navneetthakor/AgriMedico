// to connect with user Collection 
const Admin = require('../../Model/Admin');

// to validate body params 
const {validationResult} = require('express-validator');

// to provide authtoken (for digital signature) 
const jwt = require('jsonwebtoken');

// to encrypt the password 
const bcrypt = require('bcryptjs');

const adminLogin = async (req,res) => {
    try{
        // check validation of parameters provided body 
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({error: err.array(), signal: "red"});
        }
    
        // check wheter any admin exists with given email or not 
        const admin = await Admin.findOne({email: req.body.email});
        if(!admin){
            return res.status(400).json({error: "admin not exists", signal: "red"});
        }
    
        // check whether the password provided is correct or not 
        const passCompare = await bcrypt.compare(req.body.password, admin.password);
        if(!passCompare){
            return res.status(400).json({error: "enter valid credentials", signal: "red"});
        }
    
        // we reach here means all details are correct 
        // so prepare authtoken to provide it back 
        const data = {
            admin: {
                id: admin._id
            }
        }
        const jwt_secret = process.env.JWT_SECRET;
        const admintoken = jwt.sign(data,jwt_secret);
        return res.json({admintoken: admintoken, signal: "green"});
    
        } catch (error) {
        console.log(error);
        res.status(500).json({error:"Internal Server Error", signal: "red"}); 
        }
};

module.exports = adminLogin;