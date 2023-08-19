import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      alert(
        "Un e-mail de réinitialisation a été envoyé à votre adresse e-mail."
      );
      navigate("/login");
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de l'e-mail de réinitialisation :",
        error
      );
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
          Réinitialisation du mot de passe
        </Typography>
        <form onSubmit={handleResetPassword}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Envoyer l'e-mail de réinitialisation
          </Button>
        </form>
        <Box mt={2}>
          <Link to="/login">Retour à la connexion</Link>
        </Box>
      </Box>
    </Container>
  );
}

export default ResetPassword;
