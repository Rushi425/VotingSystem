import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Box } from '@mui/material';
import axios from 'axios';

// Styling: Adjust table cell styles, added background color, title, and box shadow
export default function ShowUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/allusers');
      setUsers(response.data.msg); // Access the `msg` field from API response
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch user data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: '16px', maxWidth: '900px', margin: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ marginBottom: '20px', fontWeight: 'bold', color: '#1976d2' }}>
        Voters List
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Table sx={{ minWidth: 650 }} aria-label="voters table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell><strong>Voter Name</strong></TableCell>
              <TableCell align="right"><strong>Phone Number</strong></TableCell>
              <TableCell align="right"><strong>Aadhaar Number</strong></TableCell>
              <TableCell align="right"><strong>Created At</strong></TableCell>
              <TableCell align="right"><strong>Updated At</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.voterId}
                </TableCell>
                <TableCell align="right">{user.phoneNumber}</TableCell>
                <TableCell align="right">{user.aadhaar}</TableCell>
                <TableCell align="right">{new Date(user.createdAt).toLocaleString()}</TableCell>
                <TableCell align="right">{new Date(user.updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
