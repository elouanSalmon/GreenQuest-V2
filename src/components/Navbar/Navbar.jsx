import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, IconButton, Hidden } from '@mui/material';
import { styled } from '@mui/system';
import { auth } from '../../services/firebase';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const StyledNavLinks = styled('nav')({
  display: 'flex',
});

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setIsAuthenticated(user !== null);
    });
  }, []);

  const handleLogout = () => {
    auth.signOut();
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isAuthenticated && (
        <StyledAppBar position="static">
          <StyledToolbar>
            <Typography variant="h6" color="primary">GreenQuest</Typography>
            <StyledNavLinks>
              <Hidden mdDown>
                <StyledLink to="/">
                  <Button color="inherit">Home</Button>
                </StyledLink>
                <StyledLink to="/dashboard">
                  <Button color="inherit">Dashboard</Button>
                </StyledLink>
                <StyledLink to="/offset">
                  <Button color="inherit">Offset</Button>
                </StyledLink>
                <StyledLink to="/quest">
                  <Button color="inherit"> Quests</Button>
                </StyledLink>
              </Hidden>
              <Hidden lgUp>
                <IconButton color="primary" onClick={handleMenuClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/">Home</StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/dashboard">Dashboard</StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/offset">Offset</StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/quest">Quests</StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/profile">Profile</StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/about">About</StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Hidden>
              <Hidden mdDown>
                <IconButton color="primary" onClick={handleMenuClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/profile">Profile</StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/about">About</StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Hidden>
            </StyledNavLinks>
          </StyledToolbar>
        </StyledAppBar>
      )}
    </>
  );
}

export default Navbar;