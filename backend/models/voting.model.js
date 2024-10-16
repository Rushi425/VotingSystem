// models/vote.model.js
const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  name: {
    type: String, // The party name (e.g., BJP, Congress, AAP)
    enum: ["BJP", "Congress", "AAP"],
    required: true,
  },
}, { timestamps: true });

const Voting = mongoose.model('Voting', voteSchema);

module.exports = Voting;
