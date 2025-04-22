const mongoose = require('mongoose');

// defines shape of a "Community" in mongodb
const community = new mongoose.Schema({
  sport: { type: String, required: true },
  team: { type: String,},
  privacy: { type: String, required: true },
  numMembers: { type: Number},
  zip: { type: Number},
});
community.index({sport: 1, team: 1, zip: 1}, {unique: true});
module.exports = mongoose.model("Communities", community);
