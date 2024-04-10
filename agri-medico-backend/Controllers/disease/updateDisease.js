// to connect with disease Collection 
const Disease = require('../../Model/Disease.js');

// to validate body params 
const { validationResult } = require('express-validator');

// to delete image 
const fs = require('fs');
const path = require('path');

const updateDisease = async (req, res) => {
    try {

        // find id of disease
        const diseaseId = req.params.id;

        // find disease 
        const disease = await Disease.findById(diseaseId);
        if (!disease) {
            // delete uploaded image 
            if (req.file) fs.unlinkSync(path.join(__dirname, '../..', req.file.path));
            return res.status(401).json({ message: "Wrong disease id. Can't delete.", signal: "red" });
        }

        // get all the fields which are supposed to get updated
        const { name, description, medicine_name } = req.body;

        // create object to hold values 
        const newdisease = {
            name: name ? name : disease.name,
            description: description ? description : disease.description,
            medicine_name: medicine_name ? medicine_name : disease.medicine_name,
        };
        if (req.file) newdisease.image = req.file.path;

        // delete old image if new image is being provided 
        if (req.file && disease.image !== "") fs.unlinkSync(path.join(__dirname, '../..', disease.image));

        // now update profile 
        const diseaseToUpdate = await Disease.findByIdAndUpdate(
            diseaseId,
            { $set: newdisease },
            { new: true }
        )

        // return updated profile 
        return res.json({ disease: diseaseToUpdate, signal: "green" });
    } catch (e) {
        console.log(e);

        // delete uploaded file 
        if (req.file) fs.unlinkSync(path.join(__dirname, '../..', req.file.path));
        res.status(500).json({ error: "some error occured", signal: 'red' });
    }
}

module.exports = updateDisease