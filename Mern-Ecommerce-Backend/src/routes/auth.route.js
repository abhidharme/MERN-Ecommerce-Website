const express = require("express");
const { body, validationResult, query } = require("express-validator");
const userModel = require("../models/user.model")
const { registerController, loginController, testController } = require("../controllers/auth.controller");
const { authenticate, isAdmin } = require("../middlewares/auth.middleware");

const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController)

// LOGIN || METHOD POST
router.post("/login", loginController)
router.get("/test", authenticate, isAdmin, testController)

module.exports = router;