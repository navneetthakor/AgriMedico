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
const addMedicine = require('../Controllers/medicine/addMedicine.js');
const viewMedicine = require('../Controllers/medicine/viewMedicine.js');
const viewSpecificMedicines = require('../Controllers/medicine/viewSpecificMedicines.js');
const updateMedicine = require('../Controllers/medicine/updateMedicine.js');
const deleteMedicine = require('../Controllers/medicine/deleteMedicine.js');


// --------------------------ROUTE:1 Add medicine ----------------------------------------------------------
router.post('/addmedicine',
fetchAdmin,
upload.single('image'),
[
    body("name", "please enter medicine name.").not().isEmpty(),
    body("description", "please enter medicine description.").not().isEmpty(),
    body("url", "please enter url").isArray().withMessage("Medicine urls to be provided in an array format"),
],
addMedicine);

// --------------------------ROUTE:2 Fetch medicines ----------------------------------------------------------
router.get('/getallmedicines',
fetchAdmin,
viewMedicine);

// --------------------------ROUTE:3 Fetch medicine with their names ----------------------------------------------------------
router.post('/getmedicines',
[
    body("name", "please enter valid name").isArray().withMessage("Give array of names."),
],
viewSpecificMedicines);

// --------------------------ROUTE:4 Delete medicine ----------------------------------------------------------
router.get('/deletemedicine/:id',
fetchAdmin,
deleteMedicine);

// --------------------------ROUTE:5 Update medicine ----------------------------------------------------------
router.put('/updatemedicine/:id',
fetchAdmin,
upload.single('image'),
[
    body("name", "please enter medicine name.").not().isEmpty(),
    body("description", "please enter medicine description.").not().isEmpty(),
    body("url", "please enter url").isArray().withMessage("Medicine urls to be provided in an array format"),
],
updateMedicine);

module.exports = router;