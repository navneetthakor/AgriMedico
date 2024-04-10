// to use the express 
const express = require('express');
const router = express.Router();

// to validate the given parameter in request 
const {body} = require('express-validator');

// to authorize the medicine addition, updation and deletion
const fetchAdmin = require('../Middelwares/fetchAdmin.js');

// to upload images 
const upload = require('../Middelwares/fetchImages.js');

// importing controllers
const addDisease = require('../Controllers/disease/addDisease.js');
const viewDisease = require('../Controllers/disease/viewDisease.js');
const viewSpecificDisease = require('../Controllers/disease/viewSpecificDisease.js');
const viewSpecificDiseaseWithId = require('../Controllers/disease/viewSpecificDiseaseWithId.js');
const updateDisease = require('../Controllers/disease/updateDisease.js');
const deleteDisease = require('../Controllers/disease/deleteDisease.js');


// --------------------------ROUTE:1 Add disease ----------------------------------------------------------
router.post('/adddisease',
fetchAdmin,
upload.single('image'),
[
    body("name", "please enter medicine name.").not().isEmpty(),
    body("description", "please enter medicine description.").not().isEmpty(),
    body("medicine_name", "please enter medicine names").isArray().withMessage("Medicine urls to be provided in an array format"),
],
addDisease);

// --------------------------ROUTE:2 Fetch disease ----------------------------------------------------------
router.get('/getalldiseases',
fetchAdmin,
viewDisease);

// --------------------------ROUTE:3 Fetch disease with their names ----------------------------------------------------------
router.post('/getdisease',
[
    body("name", "please enter valid name").not().isEmpty(),
],
viewSpecificDisease);

// --------------------------ROUTE:4 Delete disease ----------------------------------------------------------
router.get('/deletedisease/:id',
fetchAdmin,
deleteDisease);

// --------------------------ROUTE:5 Update disease ----------------------------------------------------------
router.put('/updatedisease/:id',
fetchAdmin,
upload.single('image'),
[
    body("name", "please enter medicine name.").not().isEmpty(),
    body("description", "please enter medicine description.").not().isEmpty(),
    body("medicine_name", "please enter medicine names").isArray().withMessage("Medicine urls to be provided in an array format"),
],
updateDisease);

// --------------------------ROUTE:6 Fetch disease with their id ----------------------------------------------------------
router.post('/getdiseasebyid',
viewSpecificDiseaseWithId);

module.exports = router;