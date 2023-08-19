import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../services/firebase";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { doc, setDoc, getDoc } from "firebase/firestore";

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
          <IconButton
            onClick={handleGoogleSignIn}
            style={{
              backgroundColor: "white",
              color: "#4285F4",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
            elevation={1}
          >
            <GoogleIcon />
          </IconButton>
        </Box>
        <Box mt={2}>
          <Link to="/signup">Pas encore de compte? Inscrivez-vous</Link>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
