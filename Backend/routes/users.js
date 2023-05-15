const express = require("express")
const router = express.Router()

// controller function
const { userSignup, userLogin } = require("../controllers/userControllers")

// Signup route
router.post("/signup", userSignup)

// Login route
router.post("/login", userLogin)

module.exports = router
