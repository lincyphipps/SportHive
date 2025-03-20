const mongoose = require('mongoose');

// User schema
const userschema = new Schema ({

  name: {
    type: String,
    required: true, unique: true,
  },

  password: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("User", userschema);