import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { db, auth } from '../../services/firebase';

function CarbonFootprintCalculator() {
  const [formData, setFormData] = useState({
    transportation: '',
    housing: '',
    food: '',
  });
  const [existingData, setExistingData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "carbon-footprint", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setExistingData(docSnap.data());
        setFormData(docSnap.data());
      }
    };
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = auth.currentUser.uid;
    const data = {
      ...formData,
      userId: userId,
    };
    const docRef = doc(db, "carbon-footprint", userId);
    try {
      await setDoc(docRef, data, { merge: true });
      console.log("Document written/updated for user ID: ", userId);
    } catch (e) {
      console.error("Error adding/updating document: ", e);
    }
    navigate('/dashboard');
  };

  return (
    <Box my={4}>
      <Typography variant="h5" component="h2" gutterBottom>
        Carbon Footprint Calculator
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Transportation"
          name="transportation"
          value={formData.transportation}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Housing"
          name="housing"
          value={formData.housing}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Food"
          name="food"
          value={formData.food}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Calculate
        </Button>
      </form>
    </Box>
  );
}

export default CarbonFootprintCalculator;
