import React from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import { styled } from "@mui/system";

const projects = [
  {
    title: "Tree planting projects",
    image: "path/to/treePlanting.jpg",
  },
  {
    title: "Solar power projects",
    image: "path/to/solarPower.jpg",
  },
  // ... (autres projets)
];

const OffsetSettings = () => {
  const [plan, setPlan] = React.useState("Basic"); // Exemple de plan
  const [totalEmissions, setTotalEmissions] = React.useState(100); // Exemple d'émissions totales
  const [percentage, setPercentage] = React.useState(10); // Exemple de pourcentage
  const cost = (totalEmissions * percentage) / 100;

  return (
    <Container>
      <Typography variant="h4" mb={3}>
        Offset Settings
      </Typography>
      <Typography variant="h6" mb={2}>
        Plan: {plan}
      </Typography>
      <Typography variant="h6" mb={2}>
        Total Emissions: {totalEmissions}
      </Typography>
      <Typography variant="h6" mb={2}>
        Cost: ${cost}
      </Typography>
      <Button variant="outlined" color="primary" mb={3}>
        Modify Plan
      </Button>
      <Typography variant="h5" mb={2}>
        Selected Offset Categories:
      </Typography>
      <Grid container spacing={3}>
        {projects.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={project.image}
                alt={project.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {project.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OffsetSettings;
