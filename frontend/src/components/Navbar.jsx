import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const pages = [
    {
        Name:"Home",
        path:'/'
    },
    {
        Name:"Voter",
        path:'/voter'
    },
    {
        Name:"Admin",
        path:'/admin'
    },
]; // Remove 'Dashboard' from here
const settings = ['Profile', 'Account', 'Logout'];

function ResponsiveAppBar({ isAdmin }) { // Accept isAdmin as a prop
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleOpenNavMenu}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          LOGO
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page,index) => (
            <Button key={index} to={page.path} component={Link} onClick={handleCloseNavMenu} color="inherit">
              {page.Name}
            </Button>
          ))}
          {/* Conditionally render the Dashboard button if isAdmin is true */}
          {isAdmin && (
            <Button key="Dashboard" onClick={handleCloseNavMenu} color="inherit">
              Dashboard
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default ResponsiveAppBar;
