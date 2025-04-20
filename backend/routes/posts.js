const express = require('express');
const router = express.Router();
const Post = require('../models/Posts.js');
const User = require('../models/Users.js');
const jwt = require('jsonwebtoken');
require("dotenv").config();

router.post("/writepost", async(req, res) => {
    const {title, text} = req.body;
    try {
        // find the user from jwt token
        const token = req.header('Authorization').replace('Bearer ', '')
        if (!token) {
        return res.status(401).json({message: 'No token'});
        }
        const decoded = jwt.verify(token, process.env.secret)
        const user = await User.findOne({decoded})
        if (!user) {
            return res.status(403).json({message: 'User does not exist'});
        }

        // check textlen
        if (text.length > 1000) {
            return res.status(403).json({message: "Post passes 1000 characters limit"});
        }
        
        //newpost = new Post({title, user, text});
        newpost = new Post({ title, author: user._id, text });
        await newpost.save();
        console.log("Post added to the database");
        res.status(200).json({message: "Post created successfully"});

    }
    catch (error) {
        console.error("Error adding post to the database", error);
        res.status(500).json({error: "Unexpected error"});
    }  
})

