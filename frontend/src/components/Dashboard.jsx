import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

// Import necessary chart components from Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ShowUsers from './ShowUsers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/dashboard');
      const data = response.data;
      
      // Map the data into chart format
      const labels = data.map((party) => party._id); // "BJP", "Congress", etc.
      const counts = data.map((party) => party.count); // Count of votes per party

      setChartData({
        labels: labels,
        datasets: [
          {
            label: 'Votes per Party',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.5)', // Bar color
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <>
      <Box className="p-8">
      <Typography variant="h4" className="mb-4 text-center">
        Party Voting Dashboard
      </Typography>
      {chartData && (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Votes by Party',
              },
            },
          }}
        />
      )}
    </Box>
    <ShowUsers />
    </>
  );
};

export default Dashboard;
