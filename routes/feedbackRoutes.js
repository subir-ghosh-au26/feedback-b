const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createFeedback, getAllFeedback } = require('../controllers/feedbackController');
const path = require("path"); 

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// POST route to handle feedback submissions
router.post("/", upload.single("image"), createFeedback);

// GET all feedback
router.get("/", getAllFeedback);

module.exports = router;