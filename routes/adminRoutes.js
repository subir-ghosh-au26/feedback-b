const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/adminController')

// Admin registration route
router.post("/register", registerAdmin);

// Admin login route
router.post("/login", loginAdmin);

module.exports = router;