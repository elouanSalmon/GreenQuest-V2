import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmail } from "../../services/firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Grid,
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [allowExtraEmails, setAllowExtraEmails] = useState(false);
  const [rgpdConsent, setRgpdConsent] = useState(false);
  const { currentUser } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (currentUser) {
      // Si l'utilisateur est déjà connecté, redirigez-le vers la page d'accueil
      navigate("/");
      return;
    }
    try {
      await registerWithEmail(
        email,
        password,
        firstName,
        lastName,
        allowExtraEmails,
        rgpdConsent
      );
      navigate("/"); // <-- Change made here
    } catch (error) {
      console.error("Error signing up with email and password:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Join GreenQuest
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Your ecological adventure.
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          Create an account
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={allowExtraEmails}
                    onChange={(e) => setAllowExtraEmails(e.target.checked)}
                    color="primary"
                  />
                }
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rgpdConsent}
                    onChange={(e) => setRgpdConsent(e.target.checked)}
                    color="primary"
                  />
                }
                label="I accept the terms and conditions of use."
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </form>
        <Box mt={2}>
          <Link to="/login">Already have an account? Log in</Link>
        </Box>
        <Box mt={2}>
          <Link to="/reset-password">Reset password</Link>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
