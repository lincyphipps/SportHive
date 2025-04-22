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
  communities:[{type: mongoose.Schema.Types.ObjectID, ref: "Communities", default: []}],

  posts: [{type: mongoose.Schema.Types.ObjectID, ref: "Posts", default: []}]
});

module.exports = mongoose.model("Users", userSchema);
