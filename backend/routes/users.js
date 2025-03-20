const express = require("express");
const router = express.Router();
const User = require("../models/User");

// get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// register a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
