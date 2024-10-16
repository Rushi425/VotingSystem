// routes/user.route.js
const express = require('express');
const router = express.Router();

const User = require('../models/admin.model'); // Ensure correct import path
const Vote = require('../models/voter.model'); // Ensure correct import path
const Voting = require('../models/voting.model')

// Voter Login
router.post('/login', async (req, res) => {
  const { voterId, phoneNumber, aadhaar } = req.body;
  try {
    const user = await Vote.findOne({ voterId, phoneNumber, aadhaar });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    res.json({ msg: 'Voter logged in successfully', user });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging in', err });
  }
});


// Fetch Voter Information
router.get('/info/:id', async (req, res) => {
  try {
    const user = await Vote.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'Voter not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching voter information', err });
  }
});
// Route Handler
// Route Handler for voting
router.post('/votecandidate', async (req, res) => {
  const { name } = req.body; // Extract the candidate's name from the request body
  try {
    const newVote = new Voting({ name }); // Create a new vote document
    await newVote.save(); // Save the vote to the database
    res.status(201).json({ msg: 'Vote submitted successfully', vote: newVote });
  } catch (err) {
    console.error('Error submitting vote:', err); // Log the error for debugging
    res.status(500).json({ msg: 'Error submitting vote', err });
  }
});


module.exports = router;
