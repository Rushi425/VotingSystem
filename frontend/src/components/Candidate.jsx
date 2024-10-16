// Vote.jsx
import React, { useState } from 'react';
import { Box, Typography, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios

const Candidate = () => {
  const candidates = ["BJP", "Congress", "AAP"]; // Initialize candidates state
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const navigate = useNavigate();

  const handleVoteSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      // Send the selectedCandidate as an object with the "name" key
      const response = await axios.post('http://localhost:3000/vote/votecandidate', { name: selectedCandidate });
      console.log(response);
      navigate('/');
    } catch (err) {
      console.error('Error submitting vote:', err.response ? err.response.data : err.message);
    }
  };
  
  

  return (
    <Box className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <Typography variant="h4" className="mb-8 text-center font-bold">
        Vote for Your Candidate
      </Typography>
      <Box
        component="form"
        onSubmit={handleVoteSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <FormControl fullWidth className="mb-4">
          <InputLabel id="candidate-select-label">Choose a Candidate</InputLabel>
          <Select
            labelId="candidate-select-label"
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
            required
          >
            {candidates.map((candidate, index) => (
              <MenuItem key={index} value={candidate}>
                {candidate} {/* Assuming candidates have a 'name' property */}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          className="bg-blue-600 text-white hover:bg-blue-700 transition w-full"
        >
          Submit Vote
        </Button>
      </Box>
    </Box>
  );
};

export default Candidate;
