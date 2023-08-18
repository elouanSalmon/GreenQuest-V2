import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerWithEmail } from "../../services/firebase";
import { Link } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerWithEmail(email, password);
      navigate("/");
    } catch (error) {
      console.error("Error signing up with email and password:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Rejoignez GreenQuest
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Commencez votre aventure écologique.
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          Création de compte
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
          />
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </form>
        <Box mt={2}>
          <Link to="/login">Already have an account? Log in</Link>
        </Box>
      </Box>
    </Container>
  );
}

export default SignUp;
