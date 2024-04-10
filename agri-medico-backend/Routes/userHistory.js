// to use express 
const express = require('express');
const router = express.Router();

// to define validation for body parameters 
const {body} = require('express-validator');

// importing middlewares 
const fetchUser = require('../Middelwares/fetchUser.js');

// importing controllers
const addToUserHistory = require('../Controllers/userHistory/addToUserHistory.js');
const getUserHistory = require('../Controllers/userHistory/getUserHistory.js');
const getDiseaseByHistoryId = require('../Controllers/userHistory/getDiseaseByHistoryId.js');


// --------------------------ROUTE:1 to push data in userHistory ----------------------------------------------------------
router.put('/addToUserHistory',
fetchUser,
// [
//     body('user_id', "please provide valid user id").not().isEmpty(),
//     body('disease_id', "please provide valid disease id").not().isEmpty(),
// ],
addToUserHistory);

// --------------------------ROUTE:2 to fetch userHistory ----------------------------------------------------------
router.get('/getUserHistory',
fetchUser,
getUserHistory);

module.exports = router;

// --------------------------ROUTE:3 to fetch disease by historyId ----------------------------------------------------------
router.post('/getdiseasebyhistoryid',
fetchUser,
getDiseaseByHistoryId);

module.exports = router;