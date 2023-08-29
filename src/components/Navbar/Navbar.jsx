import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Hidden,
  Chip,
} from "@mui/material";
import { styled } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Logo from "../../assets/images/Logo/Logo.svg";

import { db, auth } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const StyledNavLinks = styled("nav")({
  display: "flex",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

const StyledAppBar = styled(AppBar)({
  backgroundColor: "secondary.main",
  marginBottom: "20px",
});

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
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

  const [carbonFootprint, setCarbonFootprint] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "carbon-footprint", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCarbonFootprint(docSnap.data());
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isAuthenticated && (
        <StyledAppBar position="static">
          <StyledToolbar>
            <img
              src={Logo}
              alt="CarbonQuest Logo"
              style={{ height: "30px", width: "auto" }}
            />
            <StyledNavLinks>
              <Hidden smDown>
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
                <StyledLink to="/offset-settings">
                  <Button color="inherit">Offset Settings</Button>
                </StyledLink>
              </Hidden>
              <Hidden smDown>
                {carbonFootprint && (
                  <Chip
                    label={`Footprint: ${carbonFootprint.totalEmissions.toFixed(
                      2
                    )} Tons CO2e`}
                  />
                )}
                <StyledLink to="/offset">
                  <Button variant="contained">Offset Now</Button>
                </StyledLink>
              </Hidden>
              <Hidden mdUp>
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
                    <StyledLink to="/create-quest">CREATE QUEST</StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/dashboard">Dashboard</StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/offset">Offset Now</StyledLink>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    <StyledLink to="/quests">Quests</StyledLink>
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
            </StyledNavLinks>
          </StyledToolbar>
        </StyledAppBar>
      )}
    </>
  );
}

export default Navbar;
