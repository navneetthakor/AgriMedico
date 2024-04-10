// to use the express 
const express = require('express');
const router = express.Router();

// to validate the given parameter in request 
const {body} = require('express-validator');

// to upload images 
const upload = require('../Middelwares/fetchImages.js');

// importing middleware 
const fetchAdmin = require('../Middelwares/fetchAdmin.js');

// importing controllers
const createAdmin = require('../Controllers/admin/createAdmin.js');
const adminLogin = require('../Controllers/admin/adminLogin.js');
const adminAuthtokenLogin = require('../Controllers/admin/adminAuthtokenLogin.js');
const updateAdmin = require('../Controllers/admin/updateAdmin.js');


// --------------------------ROUTE:1 create Admin account ----------------------------------------------------------
router.post('/createAdmin',
upload.single('image'),
[
    body("name", "please enter name").not().isEmpty(),
    body("email", "please enter valid email").isEmail(),
    body("password", "please enter password with minimum length of : 6").isLength({min:6})
],
createAdmin);

// --------------------------ROUTE:2 login to account (previous login not require) ----------------------------------------------------------
router.post('/adminlogin',
[
    body("email", "please enter valid email").isEmail(),
    body("password", "please do enter your password").not().isEmpty()
],
adminLogin);

// --------------------------ROUTE:3 login to accoutn with authtoken ( previous login not require) ----------------------------------------------------------
router.post('/adminAuthtokenLogin', 
fetchAdmin, 
adminAuthtokenLogin);

//  --------------------------Route:4 to update profile (login required) --------------------------
router.put('/updateAdmin',
fetchAdmin,
upload.single('image'),
updateAdmin);

module.exports = router;