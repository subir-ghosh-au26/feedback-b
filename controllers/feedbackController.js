const Feedback = require("../models/Feedback");
const uploadImage = require('../utils/uploadImage');
const fs = require('fs').promises;
const sendEmail = require('../utils/sendEmail')

// POST route to handle feedback submissions
const createFeedback = async (req, res) => {
  try {
      const { name, mobileNumber, batch, overallFeedback, comments } =
        req.body;
       let imageURL = null;
       if(req.file){
         const uploadResponse = await uploadImage(req.file);
         imageURL = uploadResponse.secure_url
           await fs.unlink(req.file.path)
      }
     // Create new feedback document
      const feedback = new Feedback({
        name,
        mobileNumber,
        batch,
        overallFeedback,
        comments,
        imageURL,
      });
      // Save the feedback
      const savedFeedback = await feedback.save();

      if (overallFeedback === 'Bad') {
         await sendEmail(
              process.env.ALERT_EMAIL_RECEIVER,
             `Negative Feedback Received from ${name}`,
             `Feedback Details : Name: ${name}, Mobile Number: ${mobileNumber}, Batch: ${batch}, Overall Feedback: ${overallFeedback}, Comments: ${comments}`
         );
     }
      res.status(201).json({
        message: "Feedback submitted successfully",
        feedback: savedFeedback,
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      res.status(500).json({ message: "Failed to submit feedback", error });
    }
  };
  // GET all feedback
  const getAllFeedback = async (req, res) => {
    try {
      const feedbacks = await Feedback.find({});
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ message: "Failed to fetch feedback", error });
    }
  };

 module.exports = {
    createFeedback,
    getAllFeedback,
};