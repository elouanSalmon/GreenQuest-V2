import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

function CarbonFootprintCalculator() {
  const [formData, setFormData] = useState({
    transportation: '',
    housing: '',
    food: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement the actual calculation logic and API integration here
    console.log('Form data submitted:', formData);
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
