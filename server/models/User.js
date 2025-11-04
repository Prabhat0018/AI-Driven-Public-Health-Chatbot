// This code is like the security gate and front desk for a website or app. It handles everything involved with a person proving who they are—a process called authentication.

// 🔒 What the Code Does
// It sets up two main doors (routes): one for signing up and one for logging in.

// The Signup Door (/signup)
// When someone tries to create a new account with their name, email, and password, the code first checks the database to see if that email already exists.

// If it finds the email, it stops and says, "User already exists."

// If the email is new, it creates a new user record with the information (the password is saved in a scrambled/hashed form by the User model for security).

// Finally, it says, "Success! You signed up."

// The Login Door (/login)
// When someone tries to sign in with their email and password, the code first looks for that email in the database.

// If it can't find the user, it says, "User not found."

// If the user is found, the code uses a special tool (bcrypt) to compare the password they just typed with the secure, scrambled password stored in the database.

// If the passwords don't match, it says, "Invalid credentials."

// If the passwords do match (success!), the code creates a digital key called a Token (JWT). This key proves the user is logged in.

// It hands this key to the user's browser, saying, "Login successful," and telling the browser to use this key for all future actions (like accessing their profile).

// 👤 What is Authentication?
// Authentication is simply the process of proving you are who you say you are.

// Think of it like this:

// You show your ID (your email and password).

// The security guard (the login route) checks the photo on the ID against a database (comparing the passwords).

// If it checks out, the guard gives you an entry badge (the JWT Token).

// For the rest of the day, you just show the badge to get past other doors, instead of showing your full ID every time.

// In the code, the JWT Token is that entry badge, allowing the user to make requests to the server that require them to be logged in.

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
