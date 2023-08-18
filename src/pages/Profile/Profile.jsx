import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Button, TextField, Container, Typography } from "@mui/material";
import { db } from "../../services/firebase";

function Profile() {
  const { currentUser } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    email: currentUser.email,
    displayName: currentUser.displayName,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await db.collection("users").doc(currentUser.uid).update(userData);
      alert("Profil mis à jour avec succès!");
    } catch (error) {
      alert("Erreur lors de la mise à jour du profil:", error);
    }
  };

  return <Container></Container>;
}

export default ProfilePage;
