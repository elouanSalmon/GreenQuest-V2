import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import CarbonFootprintForm from '../../components/CarbonFootprintForm/CarbonFootprintForm';
import ReductionTips from '../../components/ReductionTips/ReductionTips';
import Dashboard from '../../pages/Dashboard/Dashboard';

function Home() {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to My Carbon Footprint App
        </Typography>
        <Typography variant="body1" paragraph>
          Use our Carbon Footprint Calculator to assess your carbon footprint, discover Reduction Tips to lower your impact, and subscribe to offset your emissions through our Subscription service.
        </Typography>
        {formData ? (
          <Dashboard data={formData} />
        ) : (
          <>
            <CarbonFootprintForm onSubmit={handleFormSubmit} />
          </>
        )}
      </Box>
    </Container>
  );
}

export default Home;
