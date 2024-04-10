// to connect with medicine Collection 
const Medicine = require('../../Model/Medicine.js');

// to validate body params 
const {validationResult} = require('express-validator');

// to delete image 
const fs = require('fs');
const path = require('path');


const updateMedicine = async(req, res) =>{
    try{

        // find id of medicine
        const medicineId = req.params.id;
        
        // find medicine 
        const medicine = await Medicine.findById(medicineId);
        if(!medicine){
            // delete uploaded image 
            if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
            return res.status(401).json({message: "Wrong medicine id. Can't delete.", signal: "red"});
        }
        
        // get all the fields which are supposed to get updated
        const {name, description, url} = req.body;
        
        // create object to hold values 
        const newMedicine = {
            name: name ? name : medicine.name,
            description: description ? description : medicine.description,
            urls: url ? url : medicine.urls,
        };
        if(req.file) newMedicine.image = req.file.path;
        
        // delete old image if new image is being provided 
        if(req.file && medicine.image!=="") fs.unlinkSync(path.join(__dirname,'../..', medicine.image));
        
        // now update profile 
        const medicineToUpdate = await Medicine.findByIdAndUpdate(
            medicineId,
            {$set : newMedicine},
            {new :  true}
        )
            
        // return updated profile 
        return  res.json({medicine: medicineToUpdate, signal:"green"});
    }catch(e){
        console.log(e);

        // delete uploaded file 
        if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
        res.status(500).json({error: "some error occured", signal: 'red'});
    }
}

module.exports = updateMedicine