const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  Author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Events', eventSchema);