require("dotenv").config();
const express = require('express');
const router = express.Router();
const Post = require('../models/Posts.js');
const User = require('../models/Users.js');
const jwt = require('jsonwebtoken');

router.post("/writepost", async(req, res) => {
    const {title, text} = req.body;
    try {
        // find the user from jwt token
        const token = req.header('Authorization').replace('Bearer ', '')
        if (!token) {
        return res.status(401).json({message: 'No token'});
        }
        const decoded = jwt.verify(token, process.env.SECRET)
        const user = await User.findById(decoded.id);
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
        user.posts.push(newpost._id);
        await user.save();
        console.log("Post added to the database");
        res.status(200).json({message: "Post created successfully"});

    }
    catch (error) {
        console.error("Error adding post to the database", error);
        res.status(500).json({error: "Unexpected error"});
    }  
});

router.get("/getposts", async (req, res) => {
    try {
        const authHeader = req.header('Authorization');
    
        if (!authHeader) {
          return res.status(401).json({ message: 'No token provided' });
        }
      const token = authHeader.replace('Bearer ', '');
      const decoded = jwt.verify(token, process.env.SECRET);
      console.log("Decoded token: ", decoded);
  
      const posts = await Post.find().populate("author", "username").sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts: ", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

router.get("/all", async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("author", "username")
        .sort({ createdAt: -1 });
  
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ message: "Failed to fetch posts" });
    }
});  

module.exports = router;