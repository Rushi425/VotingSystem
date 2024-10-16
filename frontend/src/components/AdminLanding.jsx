import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation

const AdminLanding = () => {
  const navigate = useNavigate(); // Hook to navigate between pages

  const handleAddUser = () => {
    navigate('/addvoter'); // Adjust this path based on your routing
  };

  const handleDashboard = () => {
    navigate('/dashboard'); // Adjust this path based on your routing
  };

  return (
    <Box className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Button
        variant="contained"
        className="mb-4 bg-blue-600 text-white hover:bg-blue-700 transition"
        onClick={handleAddUser}
      >
        Add User
      </Button>
      <Button
        variant="contained"
        className="bg-green-600 text-white hover:bg-green-700 transition"
        onClick={handleDashboard}
      >
        Dashboard
      </Button>
    </Box>
  );
};

export default AdminLanding;
