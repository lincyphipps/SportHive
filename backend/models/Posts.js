const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Placeholder post schema that can be changed later
const postschema = new Schema({
  title: {
    type: String, 
    required: true
  },

  author: {
    type: Schema.Types.ObjectId, ref: "User",
    required: true
  },

  text: {
    type: String, 
    required: true
  },
});

module.exports = mongoose.model("Posts", postschema);