const express = require('express');

const router = express.Router();

// importing controller
const takeScreenshot = require('../controller/screenshot/takeScreenshot');
const getScreenshot = require('../controller/screenshot/getScrenshot');
const filterScreenshot = require('../controller/screenshot/filterScreenshot');
const startTimer = require('../controller/timer/startTimer');
const stopTimer = require('../controller/timer/stopTimer');
const daily = require('../controller/totalWorkHours/daily');
const getUsers = require('../controller/users/getUsers');
const getProfile = require('../controller/users/getProfile');

// requiring authorization middleware
const authorizeUserLogin = require('../middleware/authorization/authorizeUserLogin');
// const authorizeRootUser = require('../middleware/authorization/authorizeRootUser');
// const authorizeLevelOneUser = require('../middleware/authorization/authorizeLevelOneUser');
// const authorizeLevelTwoUser = require("../middleware/authorization/authorizeLevelTwoUser")

router.post('/screenshot/takeScreenshot', authorizeUserLogin, takeScreenshot);
router.get('/screenshot/getScreenshot', authorizeUserLogin, getScreenshot);
router.get('/screenshot/filterScreenshot', authorizeUserLogin, filterScreenshot);
router.get('/timer/startTimer', authorizeUserLogin, startTimer);
router.get('/timer/stopTimer', authorizeUserLogin, stopTimer);
router.get('/totalWorkHours/daily', authorizeUserLogin, daily);
router.get('/users/getUsers', authorizeUserLogin, getUsers);
router.get('/users/getProfile', authorizeUserLogin, getProfile);

module.exports = router;
