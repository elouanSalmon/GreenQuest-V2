import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Hidden,
} from "@mui/material";
import { styled } from "@mui/system";
import { auth } from "../../services/firebase";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
}));

const StyledNavLinks = styled("nav")({
  display: "flex",
});

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
}));

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
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
            <Typography variant="h6" color="primary">
              GreenQuest
            </Typography>
            <StyledNavLinks>
              <Hidden mdDown>
                <StyledLink to="/">
                  <Button color="inherit">Home</Button>
                </StyledLink>
                <StyledLink to="/dashboard">
                  <Button color="inherit">Dashboard</Button>
                </StyledLink>
                <StyledLink to="/quests">
                  <Button color="inherit">Quests</Button>
                </StyledLink>
                <StyledLink to="/create-quest">
                  <Button color="inherit">Create quest</Button>
                </StyledLink>
              </Hidden>
              <StyledLink to="/offset">
                <Button variant="contained">Offset Now</Button>
              </StyledLink>
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
                    <StyledLink to="/" onClick={handleMenuClose}>
                      Home
                    </StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/create-quest" onClick={handleMenuClose}>
                      CREATE QUEST
                    </StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/dashboard" onClick={handleMenuClose}>
                      Dashboard
                    </StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/offset" onClick={handleMenuClose}>
                      Offset
                    </StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/quests" onClick={handleMenuClose}>
                      Quests
                    </StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/profile" onClick={handleMenuClose}>
                      Profile
                    </StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/about" onClick={handleMenuClose}>
                      About
                    </StyledLink>
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
                    <StyledLink to="/profile" onClick={handleMenuClose}>
                      Profile
                    </StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/about" onClick={handleMenuClose}>
                      About
                    </StyledLink>
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
