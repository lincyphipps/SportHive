const mongoose = require('mongoose');
const Users = require('./Users');
const Schema = mongoose.Schema;

// Placeholder post schema that can be changed later
const postschema = new Schema(
  {title: {type: String},
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Users",
    required: true

  },
  text: { type: String, required: true, maxLength: 1000},
},
  {timestamps: true}
);

module.exports = mongoose.model("Posts", postschema);