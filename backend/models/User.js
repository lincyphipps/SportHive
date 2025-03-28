const mongoose = require('mongoose');


// defines shape of a "User" in mongodb
const user = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", user);
