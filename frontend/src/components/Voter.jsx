import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const VoterLogin = () => {
  const [voterId, setVoterId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadhaar, setAadhaar] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    try {
      const response = await fetch('http://localhost:3000/vote/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voterId, phoneNumber, aadhaar }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Voter Login:', data);
        // Redirect to voter dashboard or another page
        navigate('/voterlanding'); // Adjust the path according to your routing setup
      } else {
        // Handle invalid login
        setErrorMessage(data.msg || 'Login failed');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setErrorMessage('Error logging in. Please try again later.');
    }
  };

  return (
    <Box className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <Typography variant="h4" className="mb-8 text-center font-bold">
        Voter Login
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
          className="mb-4" // Spacing between fields
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
        />
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          className="mb-4" // Spacing between fields
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          label="Aadhaar"
          variant="outlined"
          fullWidth
          className="mb-4" // Spacing between fields
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          className="bg-blue-600 text-white hover:bg-blue-700 transition w-full"
        >
          Submit
        </Button>
      </Box>
      <Box className="mt-4">
        <Button
          variant="outlined"
          component={Link}
          to="/"
          className="border-gray-600 text-gray-600 hover:bg-gray-200 transition"
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default VoterLogin;
