const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const feedbackRoutes = require("./routes/feedbackRoutes");
const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/feedback", feedbackRoutes);
app.use("/api/admin", adminRoutes);

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));