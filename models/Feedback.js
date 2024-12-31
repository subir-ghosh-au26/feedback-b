const mongoose = require('mongoose');

    const feedbackSchema = new mongoose.Schema({
      name: { type: String, required: true },
      mobileNumber: { type: String, required: true },
      batch: { type: String, required: true },
      overallFeedback: { type: String, required: true },
      comments: { type: String },
      imageURL: { type: String },
      createdAt: { type: Date, default: Date.now }
    });

    module.exports = mongoose.model('Feedback', feedbackSchema);