const mongoose = require("mongoose");


// defines shape of a "User" in mongodb
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("User", userSchema);
