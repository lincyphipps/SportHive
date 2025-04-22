require("dotenv").config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/Users.js');
const jwt = require('jsonwebtoken');

//signup route - create a new user
router.post("/signup", async(req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
    try {
        // check if user already exists
        let existuser = await User.findOne({username});
        if (existuser) {
            return res.status(403).json({message: "User already exists"});
        }

        let existemail = await User.findOne({email});
        if (existemail){
            return res.status(403).json({message: "Email already exists"});
        }

        // hash the password
        const hashpass = await bcrypt.hash(password,10);

        const newUser = new User({username, email, password: hashpass});
        await newUser.save();
        // hash the password
        //newUser.password = await bcrypt.hash(password, bcrypt.genSalt(10));

        // generate a token for the user
        const token = jwt.sign(
            { username: newUser.username },
            process.env.SECRET,
            { expiresIn: "1h" }
          );
        return res.status(200).json({message: "User created successfully", token, user:{_id: newUser._id, username: newUser.username, email: newUser.email}});
    }
    catch (error) {
        console.error("Error adding user to the database", error);
        res.status(500).json({error: "Unexpected error"});
    }  
})

// login route - authenticate an existing user
router.post("/login", async(req, res) => {
    const {username, password} = req.body;

    try {
        // check if user exists
        const user = await User.findOne({username});
        if (!user) {
            return res.status(403).json({message: 'User does not exist'});
        }

        // check if password is correct
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(403).json({message: 'Wrong password'});
        }

        // generate a token for the user
        const token = jwt.sign(
            { id: user._id, username: user.username, email: user.email, communities: user.communities, posts: user.posts},
            process.env.SECRET);
          res.status(200).json({ token, user });
    }
    catch (error) {
        console.error("Error logging in user", error);
        res.status(500).json({error: "Unexpected error"});
    }
})

module.exports = router;