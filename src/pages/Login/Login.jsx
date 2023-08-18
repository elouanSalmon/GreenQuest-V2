import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/firebase";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Error signing in with email and password:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          GreenQuest
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          Votre aventure écologique.
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          Connexion
        </Typography>
        <form onSubmit={handleLogin}>
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
          <Button type="submit" variant="contained" color="primary">
            Connexion
          </Button>
        </form>
        <Divider variant="middle" sx={{ my: 2 }} />
        <Box mt={2}>
          <Button onClick={handleGoogleSignIn}>Se connecter avec Google</Button>
        </Box>
        <Box mt={2}>
          <Link to="/signup">Pas encore de compte? Inscrivez-vous</Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
