import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel, FormControl, TextField, Switch } from '@mui/material';
import { calculateCarbonFootprint } from '../CarbonFootprintCalculation/CarbonFootprintCalculation';
import { db, auth } from '../../services/firebase';
import { doc, getDoc } from "firebase/firestore";

const OffsetPlan = ({ selectedProjects }) => {
  const [selectedPlan, setSelectedPlan] = useState('100');
  const [customValue, setCustomValue] = useState('');
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "carbon-footprint", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const formData = docSnap.data();
        const emissions = calculateCarbonFootprint(formData);
        setTotalEmissions(emissions.totalEmissions);
      }
    };
    fetchData();
  }, []);

  const plans = [
    { percentage: 100, label: '100% of my footprint', monthlyPrice: totalEmissions * 10 },
    { percentage: 120, label: '120% of my footprint', monthlyPrice: totalEmissions * 12 },
    { percentage: 200, label: '200% of my footprint', monthlyPrice: totalEmissions * 20 },
  ];

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handleCustomValueChange = (event) => {
    setCustomValue(event.target.value);
  };

  const handleToggle = () => {
    setIsAnnual(!isAnnual);
  };

  return (
    <Box>
      <Typography variant="h3" align="center" mb={2}>
        Thanks for taking climate action
      </Typography>
      <Typography variant="h5" align="center" mb={4}>
        Choose your impact
      </Typography>
      <FormControl component="fieldset">
        <RadioGroup value={selectedPlan} onChange={handlePlanChange}>
          {plans.map((plan, index) => (
            <FormControlLabel
              key={index}
              value={`${plan.percentage}`}
              control={<Radio />}
              label={`${plan.label} ${totalEmissions * plan.percentage / 100} tonnes CO2e per year - €${(
                plan.monthlyPrice / (isAnnual ? 1 : 12)
              ).toFixed(2)} / ${isAnnual ? 'year' : 'month'}`}
            />
          ))}
          <FormControlLabel
            value="custom"
            control={<Radio />}
            label={
              <>
                Custom
                <TextField
                  value={customValue}
                  onChange={handleCustomValueChange}
                  placeholder="Select a custom value"
                  type="number"
                  inputProps={{ min: 0 }}
                  sx={{ ml: 1 }}
                />
                %
                {customValue && (
                  <Typography sx={{ ml: 1 }}>
                    €{((totalEmissions * customValue / 10) / (isAnnual ? 1 : 12)).toFixed(2)} / {isAnnual ? 'year' : 'month'}
                  </Typography>
                )}
              </>
            }
          />
        </RadioGroup>
      </FormControl>
      <Box mt={4}>
        <Typography variant="h6" mb={2}>
Pay annually
</Typography>
<Typography>
Paying annually allocates funds efficiently and in advance to our climate projects. If you can afford to pay annually, we'd appreciate the support.
</Typography>
<Box mt={1} display="flex" alignItems="center">
<Switch
checked={isAnnual}
onChange={handleToggle}
color="primary"
inputProps={{ 'aria-label': 'Pay annually toggle' }}
/>
<Typography>
{isAnnual ? 'Paying annually' : 'Paying monthly'}
</Typography>
</Box>
<Box mt={4} display="flex" justifyContent="center">
<Button variant="contained" color="primary">
Select
</Button>
</Box>
</Box>
</Box>
);
};

export default OffsetPlan;
