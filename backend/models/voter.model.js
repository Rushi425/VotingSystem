// models/Voter.js
const mongoose = require('mongoose');

const voterSchema = new mongoose.Schema({
  voterId: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  aadhaar: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;
