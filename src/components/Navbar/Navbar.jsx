import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const StyledNavLinks = styled('nav')({
  display: 'flex',
});

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
}));

function Navbar() {
  return (
    <AppBar position="static">
      <StyledToolbar>
        <Typography variant="h6">My Carbon Footprint App</Typography>
        <StyledNavLinks>
          <StyledLink to="/">
            <Button color="inherit">Home</Button>
          </StyledLink>
          <StyledLink to="/profile">
            <Button color="inherit">Profile</Button>
          </StyledLink>
          <StyledLink to="/about">
            <Button color="inherit">About</Button>
          </StyledLink>
        </StyledNavLinks>
      </StyledToolbar>
    </AppBar>
  );
}

export default Navbar;