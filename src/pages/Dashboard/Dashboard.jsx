import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Container,
} from "@mui/material";
import { db, auth } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  BarChart,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "carbon-footprint", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCarbonFootprint(docSnap.data());
      }
    };
    fetchData();
  }, []);

  const barData = [
    { name: "You", value: carbonFootprint?.totalEmissions },
    { name: "Avg France", value: 8.24 },
    { name: "Avg World", value: 4.5 },
  ];

  const sections = [
    {
      title: "Flying",
      value: carbonFootprint?.flyingHabitsEmissions,
      emoji: "✈️",
    },
    {
      title: "Mobility",
      value: carbonFootprint?.mobilityEmissions,
      emoji: "🚗",
    }, // Updated the value to 'mobilityEmissions'
    { title: "Housing", value: carbonFootprint?.housingEmissions, emoji: "🏠" }, // Updated the value to 'housingEmissions'
    { title: "Diet", value: carbonFootprint?.dietEmissions, emoji: "🍽️" },
    {
      title: "Spending",
      value: carbonFootprint?.shoppingFrequencyEmissions,
      emoji: "💸",
    },
    {
      title: "Citizenship",
      value: carbonFootprint?.frCitizenshipEmissions,
      emoji: "🇫🇷",
    },
  ];

  const themeColor = "#2bd977";
  const colors = ["#2bd977", "#42e38a", "#58ed9c", "#6ef7ae", "#85ffc1"];

  const handleOffsettingClick = () => {
    navigate("/offset");
  };

  const handleCarbonFootprintFormClick = () => {
    navigate("/form");
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Dashboard
        </Typography>
        {carbonFootprint && (
          <>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Your Annual Carbon Footprint
                </Typography>
                <Typography variant="h3" align="center" gutterBottom>
                  {carbonFootprint.totalEmissions.toFixed(2)}
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Tons CO2e
                </Typography>
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOffsettingClick}
                    sx={{ mt: 2 }}
                  >
                    Start offsetting
                  </Button>
                </Box>
                <Box my={4}>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="value"
                        name="Tons of CO2e"
                        fill={themeColor}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
            <Box my={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" align="center" gutterBottom>
                    Understand your footprint
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={sections}
                            dataKey="value"
                            nameKey="title"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                          >
                            {sections.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                              />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      {sections.map((section, index) => (
                        <Accordion key={index}>
                          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>
                              {section.emoji} {section.title}:{" "}
                              {section.value.toFixed(2)} tons
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography>
                              Additional information about {section.title}{" "}
                              emissions.
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                      <Box textAlign="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleOffsettingClick}
                          sx={{ mt: 2 }}
                        >
                          Start offsetting
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCarbonFootprintFormClick}
              sx={{ mt: 2 }}
            >
              Retake Carbon Footprint Form
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}

export default Dashboard;
