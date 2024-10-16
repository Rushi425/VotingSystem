import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Box 
      className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4"
    >
      <img 
        src="https://youth.europa.eu/d8/sites/default/files/styles/1200x600/public/2024-01/voting.png?itok=ibzOMTVc" 
        alt="Voting" 
        className="w-1/2 md:w-1/3 mb-8 rounded-lg shadow-lg"
      />
      <Typography className="text-4xl font-bold mb-4 text-center">
        Why Vote?
      </Typography>
      <Typography className="text-xl mb-6 text-center">
        Voting is your voice! It's a fundamental right that shapes your community and future. 
        Participate in the democratic process and make a difference.
      </Typography>
      <Box className="mt-4 flex gap-4">
        <Button 
          variant="outlined" 
          className="border-gray-600 text-gray-600 hover:bg-gray-200 transition" 
          component={Link} 
          to="/voter"
        >
          Voter Login
        </Button>
        <Button 
          variant="outlined" 
          className="border-gray-600 text-gray-600 hover:bg-gray-200 transition" 
          component={Link} 
          to="/admin"
        >
          Admin Login
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
