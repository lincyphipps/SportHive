const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/Users.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();

//signup route - create a new user
router.post("/signup", async(req, res) => {
    const {username, password} = req.body;
    try {
        // check if user already exists
        let user = await User.findOne({username});
        if (user) {
            return res.status(403).json({message: 'User already exists'});
        }
        
        newuser = new User({username, password});

        console.log("User added to the database");

        // generate a token for the user
        const token = jwt.sign(newUser.username, process.env.secret);
        res.status(200).json({token});
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
        let user = await User.findOne({username});
        if (!user) {
            return res.status(403).json({message: 'User does not exist'});
        }

        // check if password is correct
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(403).json({message: 'Wrong password'});
        }

        console.log("User logged in successfully");
        res.status(200).json({message: "User logged in successfully"});

        // generate a token for the user
        const token = jwt.sign(user.username, process.env.secret);
        res.json({token});
    }
    catch (error) {
        console.error("Error logging in user", error);
        res.status(500).json({error: "Unexpected error"});
    }
})

module.exports = router;