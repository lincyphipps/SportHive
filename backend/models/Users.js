const mongoose = require('mongoose');

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
  },
  joinedCommunities:[{type: mongoose.Schema.Types.ObjectID, ref: "Communities"}],

  userPosts: [{type: mongoose.Schema.Types.ObjectID, ref: "Posts"}]
});

module.exports = mongoose.model("Users", userSchema);
