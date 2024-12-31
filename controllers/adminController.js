const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Admin registration route
const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = new Admin({
            username,
            password: hashedPassword,
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        console.error("Error registering admin:", error);
        res.status(500).json({ message: "Failed to register admin", error });
    }
};

// Admin login route
const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({
            message: "Logged in successfully",
            token: token,
        });
    } catch (error) {
        console.error("Error logging in admin:", error);
        res
            .status(500)
            .json({ message: "Failed to log in admin", error });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
}