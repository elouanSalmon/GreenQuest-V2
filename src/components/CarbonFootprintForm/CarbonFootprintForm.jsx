import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { db, auth } from '../../services/firebase';
import { calculateCarbonFootprint } from '../../components/CarbonFootprintCalculation/CarbonFootprintCalculation';

function CarbonFootprintCalculator() {
  const [formData, setFormData] = useState({
    flyingHabits: '',
    carUsage: '',
    shoppingFrequency: '',
    homeSize: '',
    homeOccupants: '',
    renewableElectricity: '',
    diet: '',
    fuelType: '',
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
    const calculatedFootprint = calculateCarbonFootprint(formData);
    const userId = auth.currentUser.uid;
    const data = {
      ...formData,
      ...calculatedFootprint,
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
          <InputLabel id="flying-habits-label">How would you describe your flying habits in a typical, average year?</InputLabel>
          <Select
            labelId="flying-habits-label"
            label="How would you describe your flying habits in a typical, average year?"
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
          <InputLabel id="car-usage-label">How much do you get around by car annually?</InputLabel>
          <Select
            labelId="car-usage-label"
            label="How much do you get around by car annually?"
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
          <InputLabel id="shopping-frequency-label">How much do you shop?</InputLabel>
          <Select
            labelId="shopping-frequency-label"
            label="How much do you shop?"
            name="shoppingFrequency"
            value={formData.shoppingFrequency}
            onChange={handleChange}
          >
            <MenuItem value="rarely">Rarely</MenuItem>
            <MenuItem value="average">Average</MenuItem>
            <MenuItem value="shopper">Shopper</MenuItem>
            <MenuItem value="luxury">Luxury shopper</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="home-size-label">How big is your home?</InputLabel>
          <Select
            labelId="home-size-label"
            label="How big is your home?"
            name="homeSize"
            value={formData.homeSize}
            onChange={handleChange}
          >
            <MenuItem value="studio">Studio</MenuItem>
            <MenuItem value="oneBedroom">One-bedroom</MenuItem>
            <MenuItem value="twoBedroom">Two-bedroom</MenuItem>
            <MenuItem value="threeBedroom">Three-bedroom</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="home-occupants-label">How many people live in your home?</InputLabel>
          <Select
            labelId="home-occupants-label"
            label="How many people live in your home?"
            name="homeOccupants"
            value={formData.homeOccupants}
            onChange={handleChange}
          >
            <MenuItem value="justMe">Just me</MenuItem>
            <MenuItem value="twoPeople">Two people</MenuItem>
            <MenuItem value="threePeople">Three people</MenuItem>
            <MenuItem value="fourToSix">Four to six people</MenuItem>
            <MenuItem value="sevenOrMore">Seven or more people</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="renewable-electricity-label">Do you have renewable electricity at home?</InputLabel>
          <Select
            labelId="renewable-electricity-label"
            label="Do you have renewable electricity at home?"
            name="renewableElectricity"
            value={formData.renewableElectricity}
            onChange={handleChange}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="notYet">Not yet</MenuItem>
            <MenuItem value="notSure">Not sure</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel id="diet-label">Which best describes your diet?</InputLabel>
          <Select
            labelId="diet-label"
            label="Which best describes your diet?"
            name="diet"
            value={formData.diet}
            onChange={handleChange}
          >
            <MenuItem value="vegan">Vegan</MenuItem>
            <MenuItem value="vegetarian">Vegetarian</MenuItem>
            <MenuItem value="pescetarian">Pescetarian</MenuItem>
            <MenuItem value="eatLessMeat">I try to eat less meat</MenuItem>
            <MenuItem value="eatEverything">I eat everything</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant="outlined"
        margin="normal">
          <InputLabel id="fuel-type-label">What kind of fuel does your car use?</InputLabel>
          <Select
            labelId="fuel-type-label"
            label="What kind of fuel does your car use?"
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
          >
            <MenuItem value="electricGreen">Electric (green energy)</MenuItem>
            <MenuItem value="electric">Electric</MenuItem>
            <MenuItem value="naturalGas">Natural gas</MenuItem>
            <MenuItem value="gasolineDieselHybrid">Gasoline, diesel, or hybrid</MenuItem>
            <MenuItem value="unknown">I don't know</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" size="large" style={{ marginTop: 16 }}>
          Calculate Carbon Footprint
        </Button>
      </form>
    </Box>
  );
}

export default CarbonFootprintCalculator;
