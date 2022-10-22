const express = require('express');

const router = express.Router();

// importing controller
const takeScreenshot = require('../controller/screenshot/takeScreenshot');

// requiring authorization middleware
const authorizeUserLogin = require('../middleware/authorization/authorizeUserLogin');
// const authorizeRootUser = require('../middleware/authorization/authorizeRootUser');
const authorizeLevelOneUser = require('../middleware/authorization/authorizeLevelOneUser');
// const authorizeLevelTwoUser = require("../middleware/authorization/authorizeLevelTwoUser")

router.post('/screenshot/takeScreenshot', authorizeUserLogin, authorizeLevelOneUser, takeScreenshot);

module.exports = router;
