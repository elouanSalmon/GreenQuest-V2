import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import CarbonFootprintForm from "../components/Form/CarbonFootprintForm/CarbonFootprintForm";
import ReductionTips from "../components/ReductionTips/ReductionTips";
import Dashboard from "./Dashboard";
import { useAuth } from "../contexts/AuthContext";

function Home() {
  const { hasCompletedOnboarding } = useAuth();
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
          Use our Carbon Footprint Calculator to assess your carbon footprint,
          discover Reduction Tips to lower your impact, and subscribe to offset
          your emissions through our Subscription service.
        </Typography>
        {hasCompletedOnboarding ? (
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
