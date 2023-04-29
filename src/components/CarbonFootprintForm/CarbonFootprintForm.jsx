import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { db, auth } from '../../services/firebase';

function CarbonFootprintForm() {
  const [formData, setFormData] = useState({
    flyingHabits: '',
    carUsage: '',
    carFuel: '',
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
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="flying-habits-label">Flying Habits</InputLabel>
          <Select
            labelId="flying-habits-label"
            label="Flying Habits"
            name="flyingHabits"
            value={formData.flyingHabits}
            onChange={handleChange}
          >
            <MenuItem value="rarely">I fly rarely or never</MenuItem>
            <MenuItem value="occasionally">Occasionally</MenuItem>
            <MenuItem value="regularly">Regularly</MenuItem>
            <MenuItem value="custom">Enter custom amount</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="car-usage-label">Car Usage</InputLabel>
          <Select
            labelId="car-usage-label"
            label="Car Usage"
            name="carUsage"
            value={formData.carUsage}
            onChange={handleChange}
          >
            <MenuItem value="noDrive">I don't drive or ride</MenuItem>
            <MenuItem value="upTo5000">Up to 5 000 km</MenuItem>
            <MenuItem value="5000to10000">5 000 - 10 000 km</MenuItem>
            <MenuItem value="10000to15000">10 000 - 15 000 km</MenuItem>
            <MenuItem value="moreThan15000">More than 15 000 km</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="car-fuel-label">What kind of fuel does your car use?</InputLabel>
<Select
         labelId="car-fuel-label"
         label="What kind of fuel does your car use?"
         name="carFuel"
         value={formData.carFuel}
         onChange={handleChange}
       >
<MenuItem value="electricGreen">Electric (green energy)</MenuItem>
<MenuItem value="electric">Electric</MenuItem>
<MenuItem value="naturalGas">Natural gas</MenuItem>
<MenuItem value="gasolineDieselHybrid">Gasoline, diesel, or hybrid</MenuItem>
<MenuItem value="dontKnow">I don't know</MenuItem>
</Select>
</FormControl>

            <Button type="submit" variant="contained" color="primary">
      Calculate
    </Button>
  </form>
</Box>
);
}

export default CarbonFootprintForm;