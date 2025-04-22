const express = require("express");
const router = express.Router();
const User = require("../models/Users.js");

  router.get("/profile", async (req, res) =>{
    try {
      const userID = req.user.id;
      let user = await User.findById(userID);
      if(!user){
        return res.status(404).json({message: 'User not found'});
      }
      res.json(user);
    } 
    catch (error){
      console.error("Error fetching user profile", error);
      res.status(500).json({error: "Unexpected error"});
    }
  });

module.exports = router;
