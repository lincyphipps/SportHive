const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('./User');

// User schema
const userSchema = new mongoose.Schema ({

  username: {
    type: String,
    required: true, 
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Users", userSchema);
