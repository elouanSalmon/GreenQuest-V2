// Dashboard.jsx

import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { db, auth } from '../../services/firebase';
import { doc, getDoc } from "firebase/firestore";
import { calculateCarbonFootprint } from '../../components/CarbonFootprintCalculation/CarbonFootprintCalculation';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "carbon-footprint", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const formData = docSnap.data();
        const calculatedFootprint = calculateCarbonFootprint(formData);
        setCarbonFootprint(calculatedFootprint);
      }
    };
    fetchData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Box my={4}>
      <Typography variant="h5" component="h2" gutterBottom>
        Dashboard
      </Typography>
      {carbonFootprint && (
        <Box>
          <Typography variant="body1">
            Total Emissions: {carbonFootprint.totalEmissions} kg CO2e
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Flying Habits', value: carbonFootprint.flyingHabitsEmissions },
                  { name: 'Car Usage', value: carbonFootprint.carUsageEmissions },
                  { name: 'Car Fuel', value: carbonFootprint.carFuelEmissions },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {[
                  { name: 'Flying Habits', value: carbonFootprint.flyingHabitsEmissions },
                  { name: 'Car Usage', value: carbonFootprint.carUsageEmissions },
                  { name: 'Car Fuel', value: carbonFootprint.carFuelEmissions },
                ].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;
