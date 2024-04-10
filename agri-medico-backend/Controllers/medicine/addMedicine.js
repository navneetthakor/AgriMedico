// to connect with medicine Collection 
const Medicine = require('../../Model/Medicine.js');

// to validate body params 
const {validationResult} = require('express-validator');

// to delete image 
const fs = require('fs');
const path = require('path');


const addMedicine = async(req,res) =>{
    try{

        // checking the given parameters 
        const err =  validationResult(req);
        if(!err.isEmpty()){
            // delete uploaded file 
            if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
            return res.status(400).json({error: err.array(), signal: "red"})
        }

        // check wheteher already the medicine exists
        let medicine = await Medicine.findOne({name: req.body.name});
        if(medicine){
            // delete uploaded file 
            if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
            return res.status(400).json({error: "medicine with given name already exists", signal: "red"});
        }

        const newMedicine = new Medicine({
            name: req.body.name,
            images: req.file ? req.file.path : "",
            description: req.body.description,
            urls: req.body.url
        })
        await newMedicine.save();

        return res.status(200).json({"Success": "Medicine added", signal: "green"})

    }catch(e){
        console.log(e);

        // delete uploaded file 
        if(req.file) fs.unlinkSync(path.join(__dirname,'../..', req.file.path));
        res.status(500).json({error: "some error occured", signal: 'red'});
    }
};

module.exports = addMedicine;