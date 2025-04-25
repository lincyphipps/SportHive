const express = require('express');
const router = express.Router();
const Event = require('../models/Events');
const jwt = require('jsonwebtoken');
const User = require('../models/Users.js');

// Create an event
router.post('/create', async (req, res) => {
  const { title, date, location, description } = req.body;
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) {
    return res.status(403).json({message: 'No token'});
    }
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decoded.id);
    if (!user) {
        return res.status(403).json({message: 'User does not exist'});
    }
    const newEvent = new Event({
      title,
      date,
      location,
      description,
      Author: user._id,
    });
    await newEvent.save();
    res.status(200).json({ message: 'Event created successfully', event: newEvent });
  }
  catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// Get all events
router.get('/all', async (req, res) => {
  try {
    const events = await Event.find().populate('Author', 'username');
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

module.exports = router;