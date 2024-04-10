// to connect with disease Collection 
const Disease = require('../../Model/Disease.js');

// to validate body params 
const { validationResult } = require('express-validator');

// to delete image 
const fs = require('fs');
const path = require('path');

const addDisease = async (req, res) => {
    try {

        // checking the given parameters 
        const err = validationResult(req);
        if (!err.isEmpty()) {
            // delete uploaded file 
            if (req.file) fs.unlinkSync(path.join(__dirname, '../..', req.file.path));
            return res.status(400).json({ error: err.array(), signal: "red" })
        }

        // check wheteher already the medicine exists
        let disease = await Disease.findOne({ name: req.body.name });
        if (disease) {
            // delete uploaded file 
            if (req.file) fs.unlinkSync(path.join(__dirname, '../..', req.file.path));
            return res.status(400).json({ error: "Disease with given name already exists", signal: "red" });
        }

        const newDisease = new Disease({
            name: req.body.name,
            images: req.file ? req.file.path : "",
            description: req.body.description,
            medicine_name: req.body.medicine_name
        })
        await newDisease.save();

        return res.status(200).json({ "Success": "Disease added", signal: "green" })

    } catch (e) {
        console.log(e);

        // delete uploaded file 
        if (req.file) fs.unlinkSync(path.join(__dirname, '../..', req.file.path));
        res.status(500).json({ error: "some error occured", signal: 'red' });
    }
}

module.exports = addDisease