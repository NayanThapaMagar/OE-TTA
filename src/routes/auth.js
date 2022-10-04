const express = require('express');

const router = express.Router();

// importing controller
const login = require('../controller/auth/login');
const registerCompany = require('../controller/auth/register/company');
const registerUser = require('../controller/auth/register/user');
// const logout = require("../controller/auth/logout");
// const refreshAccessTokenSecret = require("../controller/auth/refreshAccessTokenSecret");

// requiring authorization middleware
const authorizeUserLogin = require('../middleware/authorization/authorizeUserLogin');
const authorizeOwner = require('../middleware/authorization/authorizeOwner');
// const authorizeRootUser = require("../middleware/authorization/authorizeRootUser")

// handeling login request
router.post('/login', login);
// handeling registering request
router.post('/register/company', registerCompany);
// // handeling logout request
// router.post("/logout", authorizeUserLogin, logout);
// // handeling refresh access token request
// router.get("/refreshtoken", authorizeUserLogin, refreshAccessTokenSecret);
// // handeling request to add users of two different level
router.post('/register/user', authorizeUserLogin, authorizeOwner, registerUser);

module.exports = router;
