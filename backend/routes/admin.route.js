// routes/admin.route.js
const express = require('express');
const router = express.Router();
const User = require('../models/admin.model'); // Ensure correct import path
const Vote = require('../models/voter.model'); // Ensure correct import path
const Voting = require('../models/voting.model'); // Ensure correct import path

// Admin login
router.post('/login', async (req, res) => {
  const { voterId, spid } = req.body;
  try {
    const admin = await User.findOne({ voterId, spid});
    if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });
    res.json({ msg: 'Admin logged in successfully', admin });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging in', err });
  }
});


// Add Admin
router.post('/add-admin', async (req, res) => {
  const { voterId, aadhaar, spid } = req.body;
  try {
    const newUser = new User({ voterId, aadhaar, spid });
    await newUser.save();
    res.json({ msg: 'Voter added successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ msg: 'Error adding voter', err });
  }
});

// Add Voter
router.post('/addvoter', async (req, res) => {
  const { voterId, phoneNumber, aadhaar } = req.body;

  try {
    // Check if voter already exists
    const existingVoter = await Vote.findOne({ voterId });
    if (existingVoter) {
      return res.status(400).json({ msg: 'Voter ID already exists' });
    }

    // Create a new voter document
    const newVoter = new Vote({
      voterId,
      phoneNumber,
      aadhaar,
    });

    await newVoter.save(); // Save the voter to the database
    res.status(201).json({ msg: 'Voter added successfully', voter: newVoter });
  } catch (err) {
    console.error('Error adding voter:', err);
    res.status(500).json({ msg: 'Error adding voter', err });
  }
});

router.get('/allusers',async(req,res)=>{
  try{
    const datas = await Vote.find()
    res.status(200).json({
      msg:datas
    })
  }catch(err){
    res.status(500).json({
      msg:"error"
    })
  }
})

// Dashboard (Voting status)
router.get('/dashboard', async (req, res) => {
  try {
    const votes = await Voting.aggregate([
      {
        $group: {
          _id: "$name", // Group votes by party name
          count: { $sum: 1 } // Count number of votes per party
        }
      }
    ]);
    res.status(200).json(votes);
  } catch (err) {
    console.error('Error fetching voting status:', err);
    res.status(500).json({ msg: 'Error fetching voting status', err });
  }
});



module.exports = router;
