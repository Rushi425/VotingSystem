import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const AddVoter = () => {
  const [voterId, setVoterId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages
  
    try {
      // Create an object with the correct fields
      const voterData = { voterId, phoneNumber, aadhaar };
      
      // Send a POST request with the voterData
      const response = await axios.post('http://localhost:3000/admin/addvoter', voterData);
      
      // Check if the request was successful
      if (response.status === 201) {
        navigate('/adminlanding'); // Redirect to admin landing page
      } else {
        setErrorMessage(response.data.msg || 'Adding voter failed');
      }
    } catch (err) {
      console.error('Error adding voter:', err);
      setErrorMessage('Error adding voter. Please try again later.');
    }
  };
  

  return (
    <Box className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <Typography variant="h4" className="mb-8 text-center font-bold">
        Add New Voter
      </Typography>
      {errorMessage && (
        <Typography variant="body1" color="error" className="mb-4">
          {errorMessage}
        </Typography>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <TextField
          label="Voter ID"
          variant="outlined"
          fullWidth
          className="mb-4"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          required
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          className="mb-4"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <TextField
          label="Aadhaar"
          variant="outlined"
          fullWidth
          className="mb-4"
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          className="bg-blue-600 text-white hover:bg-blue-700 transition w-full"
        >
          Add Voter
        </Button>
      </Box>
    </Box>
  );
};

export default AddVoter;
