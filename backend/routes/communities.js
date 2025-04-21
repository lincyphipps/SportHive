require("dotenv").config();
const express = require('express');
const router = express.Router();
const Community = require('../models/Communities.js');

//signup route - create a new community
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

//https://stackoverflow.com/questions/60070267/how-to-get-the-list-of-all-the-posts-by-a-particular-user-in-express-mongo
router.get("/join_community", async(req, res) => {
    const { query } = req.query;
    try {
        // search communities
        //https://www.geeksforgeeks.org/how-to-implement-search-and-filtering-in-a-rest-api-with-node-js-and-express-js/
        const search = isNaN(query)
        ? {
                $or: [
                { sport: { $regex: query, $options: "i" } },
                { team: { $regex: query, $options: "i" } },
            ]
        }
        : {
            $or: [
                { sport: { $regex: query, $options: "i" } },
                { team: { $regex: query, $options: "i" } },
                { zip: Number(query) }
            ]

        };
        const communities = await Community.find(search)
        console.log(req.query);
        res.status(200).json(communities);
        
    }
    catch (error) {
        console.error("Error searching communities:", error);
        res.status(500).json({message: "Unexpected error"});
    }  
})

module.exports = router;