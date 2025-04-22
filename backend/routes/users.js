const express = require("express");
const router = express.Router();
const User = require("../models/Users.js");
const jwt = require('jsonwebtoken');
//https://codewithpawan.medium.com/authentication-and-authorization-in-node-js-a-comprehensive-guide-2755b57dce27

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(403).json({ message: "Access denied" });

  jwt.verify(token, process.env.SECRET, (err, user) => {
      if (err) {
          return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;  // Attach the decoded user data to the request object
      next();  // Continue to the next middleware or route handler
  });
};

// Profile route
router.get("/profile", authenticateToken, async (req, res) => {
  try {
      const userID = req.user.id;  // Use the ID decoded from the token
      let user = await User.findById(userID).populate('communities').populate('posts');
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.json({id: user._id, username: user.username, email: user.email, communities: user.communities || [], posts: user.posts || []});
  } catch (error) {
      console.error("Error fetching user profile", error);
      res.status(500).json({ error: "Unexpected error" });
  }
});

module.exports = router;