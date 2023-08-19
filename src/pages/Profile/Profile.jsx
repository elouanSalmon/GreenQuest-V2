import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { auth, db } from "../../services/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    const getUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userData = await getDoc(userRef);

        if (userData.exists()) {
          setUser(userData.data());
          setValue("displayName", userData.data().displayName);
          setValue("email", userData.data().email);
        }
      }
    };

    getUserData();
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, data);
      setUser(data);
      alert("Profile updated successfully");
    } catch (error) {
      alert("Error updating profile");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2rem",
      }}
    ></Box>
  );
};

export default Profile;
