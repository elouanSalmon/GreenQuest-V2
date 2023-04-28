import React, { useState } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

function Subscription() {
  const [formData, setFormData] = useState({
    email: '',
    plan: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement the actual subscription logic and API integration with Stripe here
    console.log('Form data submitted:', formData);
  };

  return (
    <Box my={4}>
      <Typography variant="h5" component="h2" gutterBottom>
        Offset Your Emissions with a Subscription
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          label="Plan"
          name="plan"
          select
          value={formData.plan}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
          SelectProps={{
            native: true,
          }}
        >
          <option value="">Select a plan</option>
          <option value="basic">Basic - $10/month</option>
          <option value="standard">Standard - $20/month</option>
          <option value="premium">Premium - $30/month</option>
        </TextField>
        <Button type="submit" variant="contained" color="primary">
          Subscribe
        </Button>
      </form>
    </Box>
  );
}

export default Subscription;
