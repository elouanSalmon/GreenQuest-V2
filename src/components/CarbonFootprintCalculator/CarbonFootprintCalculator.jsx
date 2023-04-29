import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Box, Typography, FormControl, InputLabel, MenuItem, Select, Button } from '@mui/material';
import { db, auth } from '../../services/firebase';

function CarbonFootprintCalculator() {
  const [formData, setFormData] = useState({
    flyingHabits: '',
    carUsage: '',
    carFuel: '',
    shoppingFrequency: '',
    homeSize: '',
    homeOccupants: '',
    renewableElectricity: '',
    diet: '',
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

  const calculateCarbonFootprint = () => {
    const footprint = {
      flying: 0,
      car: 0,
      shopping: 0,
      home: 0,
      energy: 0,
    };

    // Flying habits
    if (formData.flyingHabits === "rarely") {
      footprint.flying = 0.5;
    } else if (formData.flyingHabits === "occasionally") {
      footprint.flying = 1;
    } else if (formData.flyingHabits === "regularly") {
      footprint.flying = 2;
    }

    // Car usage
    if (formData.carUsage === "noDrive") {
      footprint.car = 0;
    } else if (formData.carUsage === "upTo5000") {
      footprint.car = 1;
    } else if (formData.carUsage === "5000to10000") {
      footprint.car = 2;
    } else if (formData.carUsage === "10000to15000") {
      footprint.car = 3;
    } else if (formData.carUsage === "moreThan15000") {
      footprint.car = 4;
    }

    // Shopping frequency
    if (formData.shoppingFrequency === "rarely") {
      footprint.shopping = 0.5;
    } else if (formData.shoppingFrequency === "average") {
      footprint.shopping = 1;
    } else if (formData.shoppingFrequency === "shopper") {
      footprint.shopping = 1.5;
    } else if (formData.shoppingFrequency === "luxuryShopper") {
      footprint.shopping = 2;
    }

    // Home size
    if (formData.homeSize === "studio") {
      footprint.home = 0.5;
    } else if (formData.homeSize === "oneBedroom") {
      footprint.home = 1;
    } else if (formData.homeSize === "twoBedroom") {
      footprint.home = 1.5;
    } else if (formData.homeSize === "threeBedroom") {
      footprint.home = 2;
    }

    // Home occupants
    if (formData.homeOccupants === "justMe") {
      footprint.energy = 1;
    } else if (

formData.homeOccupants === "twoPeople") {
footprint.energy = 0.75;
} else if (formData.homeOccupants === "threePeople") {
footprint.energy = 0.6;
} else if (formData.homeOccupants === "fourToSixPeople") {
footprint.energy = 0.5;
} else if (formData.homeOccupants === "sevenOrMorePeople") {
footprint.energy = 0.4;
}
// Renewable electricity
if (formData.renewableElectricity === "yes") {
  footprint.energy *= 0.3;
}

return footprint;

    };

const handleSubmit = async (event) => {
event.preventDefault();
const userId = auth.currentUser.uid;
const carbonFootprint = calculateCarbonFootprint();
const data = {
...formData,
...carbonFootprint,
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
<FormControl fullWidth variant="outlined" margin="normal">
<InputLabel id="shopping-frequency-label">Shopping Frequency</InputLabel>
<Select
         labelId="shopping-frequency-label"
         label="Shopping Frequency"
         name="shoppingFrequency"
         value={formData.shoppingFrequency}
         onChange={handleChange}
       >
<MenuItem value="rarely">Rarely</MenuItem>
<MenuItem value="average">Average</MenuItem>
<MenuItem value="shopper">Shopper</MenuItem>
<MenuItem value="luxuryShopper">Luxury shopper</MenuItem>
</Select>
</FormControl>
<FormControl fullWidth variant="outlined" margin="normal">
<InputLabel id="home-size-label">Home Size</InputLabel>
<Select
         labelId="home-size-label"
         label="Home Size"
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
<InputLabel id="home-occupants-label">Home Occupants</InputLabel>
<Select
         labelId="home-occupants-label"
         label="Home Occupants"
         name="homeOccupants"
         value={formData.homeOccupants}
         onChange={handleChange}
       >
<MenuItem value="justMe">Just me</MenuItem>
<MenuItem value="twoPeople">Two people</MenuItem>
<MenuItem value="threePeople">Three people</MenuItem>
<MenuItem value="fourToSixPeople">Four to six people</MenuItem>
<MenuItem value="sevenOrMorePeople">Seven or more people</MenuItem>
</Select>
</FormControl>
<FormControl fullWidth variant="outlined" margin="normal">
<InputLabel id="renewable-electricity-label">Renewable Electricity</InputLabel>
<Select
         labelId="renewable-electricity-label"
         label="Renewable Electricity"
         name="renewableElectricity"
         value={formData.renewableElectricity}
         onChange={handleChange}
       >
<MenuItem value="yes">Yes</MenuItem>
<MenuItem value="notYet">Not yet</MenuItem>
<MenuItem value="notSure">Not sure</MenuItem>
</Select>
</FormControl>
<Button type="submit" variant="contained" color="primary">
Calculate
</Button>
</form>
</Box>
);
}

export default CarbonFootprintCalculator;
    