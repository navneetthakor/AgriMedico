// to connect with collection in mongoDb 
const Admin = require('../../Model/Admin');

// to delete image 
const fs = require('fs');
const path = require('path');

const updateUser = async (req,res) => {
    try{

        // find id of user
        const adminId = req.admin.id;
        
        // find user 
        const admin = await Admin.findById(adminId);
        if(!admin){
            // delete uploaded image 
            if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
            return res.status(401).json({message: "Please login with valid credentials", signal: "red"});
        }
        
        // now admin exists
        // get all the fields which are suppose to update 
        const {name, contact_num} = req.body;
        
        // create object to hold values 
        const newAdmin = {
            name: name ? name : admin.name,
            contact_num: contact_num ? contact_num : admin.contact_num,
        };
        if(req.file) newAdmin.image = req.file.path;
        
        // delete old image if new image is being provided 
        if(req.file && admin.image!=="") fs.unlinkSync(path.join(__dirname,'../..', admin.image));
        
        // now update profile 
        const updtAdmin = await Admin.findByIdAndUpdate(
            adminId,
            {$set : newAdmin},
            {new :  true}
        )
            
        // return updated profile 
        return  res.json({admin: updtAdmin, signal:"green"});
    }
    catch(e){
        console.log(e);
        // delete uploaded image 
        if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
        return res.status(500).json({message: "internal error occured", signal: "red"});
    }
};

module.exports = updateUser;