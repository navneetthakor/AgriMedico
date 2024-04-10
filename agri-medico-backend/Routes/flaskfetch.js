// to use the express 
const express = require('express');
const router = express.Router();

// to upload images 
const upload = require('../Middelwares/fetchImages.js');

// to communicate with ML model
const axios = require('axios');
const FormData = require('form-data');

// to read file 
const fs = require('fs');
const path = require('path');

// --------------------------ROUTE:1 Fetch disease name from flask server -------------------------------------------------------

router.post('/fetchdiseasename', upload.single('image'),  async (req, res) => {
    try {
        // Ensure req.file contains the uploaded file details
        console.log("hlo: ", req.file)
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        // Read the uploaded image file as binary data
        let imagePath = req.file.path;
        const imageBuffer = fs.readFileSync(imagePath);

        // Create a FormData object and append the image buffer with the key "image"
        const formData = new FormData();
        formData.append('image', imageBuffer, { filename: req.file.originalname });

        // Send the image data to Flask server
        const url = `${process.env.MODEL_URL}/classify`;
        const response = await axios.post(url, formData, {
            headers: formData.getHeaders() // Set headers from FormData object
        });

        // Handle the response from Flask
        const predicted_class = response.data.class_name
        console.log(predicted_class)


        // fetching disease information from another endpoint
        let requestBody = {
            name: predicted_class
        }

        let requestHeader = {
            'Content-Type': 'application/json'
        }
        const diseaseDetails = await axios.post(`${process.env.BACKEND_URL}/disease/getdisease`,requestBody, {
            headers: requestHeader
        })
        const diseaseDetailsResponse = diseaseDetails.data
        console.log("diseaseDetailsResponse : ", diseaseDetailsResponse)


        // fetching medicine information from another endpoint
        const medicines = diseaseDetailsResponse.disease.medicine_name
        console.log("medicines are : ", medicines)
        requestBody = {
            name: medicines
        }
        requestHeader = {
            'Content-Type': 'application/json'
        }
        const medicineDetails = await axios.post(`${process.env.BACKEND_URL}/medicine/getmedicines`,requestBody, {
            headers: requestHeader
        })
        const medicineDetailsResponse = medicineDetails.data
        console.log(medicineDetailsResponse)
        imagePath = imagePath.replace('public\\', '')
        res.status(200).json({ diseaseDetailsResponse, medicineDetailsResponse, imagePath });
    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router