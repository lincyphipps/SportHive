require("dotenv").config();
const express = require('express');
const router = express.Router();
const Community = require('../models/Communities.js');

//signup route - create a new user
router.post("/create_community", async(req, res) => {
    const {sport, team, privacy, numMembers, zip} = req.body;
    if (!sport || !privacy) {
        return res.status(400).json({ message: "Sport and Privacy fields are required" });
      }
    try {
        // check if community already exists
        let existCommunity = await Community.findOne({sport, team, zip});
        if (existCommunity) {
            return res.status(403).json({message: "Sports community already exists"});
        }

        const newCommunity = new Community({sport, team, privacy, numMembers: numMembers || 2, zip});
        await newCommunity.save();

        // generate a token for the user
        
        return res.status(200).json({message: "Community created successfully", community: newCommunity});
    }
    catch (error) {
        console.error("Error adding community to the database", error);
        res.status(500).json({error: "Unexpected error"});
    }  
})

module.exports = router;