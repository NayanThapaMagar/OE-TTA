const express = require('express');

const router = express.Router();

// importing controller
const login = require('../controller/auth/login');
const logout = require('../controller/auth/logout');
const registerCompany = require('../controller/auth/register/company');
const registerUser = require('../controller/auth/register/user');
// const logout = require("../controller/auth/logout");
// const refreshAccessTokenSecret = require("../controller/auth/refreshAccessTokenSecret");

// requiring authorization middleware
const authorizeUserLogin = require('../middleware/authorization/authorizeUserLogin');
const authorizeRootUser = require('../middleware/authorization/authorizeRootUser');
const authorizeLevelOneUser = require('../middleware/authorization/authorizeLevelOneUser');
// const authorizeLevelTwoUser = require("../middleware/authorization/authorizeLevelTwoUser")

// handeling login request
router.post('/login', login);
router.post('/logout', authorizeUserLogin, logout);
// handeling registering request
router.post('/register/company', registerCompany);
// // handeling logout request
// router.post("/logout", authorizeUserLogin, logout);
// // handeling refresh access token request
// router.get("/refreshtoken", authorizeUserLogin, refreshAccessTokenSecret);
// // handeling request to add users of two different level
router.post('/register/user/manager', authorizeUserLogin, authorizeRootUser, registerUser);
router.post('/register/user/employee', authorizeUserLogin, authorizeLevelOneUser, registerUser);

module.exports = router;
