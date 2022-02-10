// import express 
const express = require("express");



// importation du middleware password
const middlewarePassword = require("../middleware/password");

//importation du controllers/user.js
const userController = require("../controllers/user");

// la fonction Router()
const router = express.Router();

// la route signup
router.post("/signup" , userController.signup);

// la route login
router.post("/login" , userController.login)

// exportation du module
module.exports = router;