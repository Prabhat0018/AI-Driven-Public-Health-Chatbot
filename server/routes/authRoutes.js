//Authentication is the process of verifying who a user is. In this context, 
// the code provides two primary authentication
//  functions: Signup (creating a new user account) and Login (verifying an existing user's credentials).
//     /signup	POST	Registers a new user. It checks if an account with the provided email already exists. If not, it creates a new User document in the database, saves it (presumably after hashing the password in the User model middleware, as it's not explicitly done here but is standard practice), and returns a success message.
// /login	POST	Authenticates an existing user. It finds the user by their email. If found, it uses bcrypt.compare to check if the provided password matches the stored, hashed password. If the credentials are valid, it generates a JWT containing the user's ID, signs it with a secret key, and sends it back to the client for future authenticated requests/**Code: AI-Driven-Public-Health-Chatbot/server/routes/authRoutes.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    res.status(500).json({ message: "Error during signup", error });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
});

module.exports = router;
