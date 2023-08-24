import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Box,
  Paper,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Pagination,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import { auth, firestore } from "../../services/firebase";
import { doc, getDoc } from "firebase/firestore";

import treePlanting from "../../assets/images/OffsetSelection/tree_planting.jpg";
import solarPower from "../../assets/images/OffsetSelection/solar_power.jpg";
import directAirCapture from "../../assets/images/OffsetSelection/direct_air_capture.jpg";
import hydroPower from "../../assets/images/OffsetSelection/hydro_power.jpg";
import cleanCookStoves from "../../assets/images/OffsetSelection/clean_cook_stoves.jpg";
import deforestationPrevention from "../../assets/images/OffsetSelection/deforestation_prevention.jpg";

const projects = [
  {
    title: "Tree planting projects",
    image: treePlanting,
  },
  {
    title: "Solar power projects",
    image: solarPower,
  },
  {
    title: "Direct air capture",
    image: directAirCapture,
  },
  {
    title: "Hydro power projects",
    image: hydroPower,
  },
  {
    title: "Clean cook stoves",
    image: cleanCookStoves,
  },
  {
    title: "Deforestation prevention",
    image: deforestationPrevention,
  },
];

const OffsetSettings = () => {
  const [plan, setPlan] = useState(null);
  const [totalEmissions, setTotalEmissions] = useState(null);
  const [selectedOffsets, setSelectedOffsets] = useState([]);
  const cost = (totalEmissions * plan) / 100;

  const [open, setOpen] = useState(false); // For the modal
  const [page, setPage] = useState(1); // For pagination

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.uid;

      // Récupérer les données de l'utilisateur
      const userRef = doc(firestore, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists) {
        setPlan(userDoc.data().selectedPlan);
      }

      // Récupérer les émissions totales de l'utilisateur
      const emissionsRef = doc(firestore, "carbon-footprint", userId);
      const emissionsDoc = await getDoc(emissionsRef);
      if (emissionsDoc.exists) {
        setTotalEmissions(emissionsDoc.data().totalEmissions);
      }

      // Récupérer les types d'offset sélectionnés
      const offsetRef = doc(firestore, "offset-selection", userId);
      const offsetDoc = await getDoc(offsetRef);
      if (offsetDoc.exists) {
        setSelectedOffsets(offsetDoc.data().selectedProjects);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" gutterBottom>
          My Offset Plan
        </Typography>
        <Typography variant="subtitle1">
          Manage and view your personal carbon offset subscription.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} style={{ display: "flex" }}>
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "20px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Subscription Details
            </Typography>
            <Divider style={{ marginBottom: "15px" }} />
            <Typography variant="h6">
              Plan: <strong>{plan}% carbon offset</strong>
            </Typography>
            <Typography variant="h6">
              Total Emissions: <strong>{totalEmissions}</strong>
            </Typography>
            <Typography variant="h6">
              Monthly Cost: <strong>${cost}</strong>
            </Typography>
            <Box mt={4}>
              <Button variant="outlined" color="customBlue" size="large">
                Modify Subscription
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          style={{ display: "flex", position: "relative" }}
        >
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "20px",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              position: "relative", // Ajout de cette ligne pour positionner l'icône correctement
            }}
          >
            <IconButton
              style={{ position: "absolute", top: "10px", right: "10px" }}
              onClick={handleOpen}
            >
              <InfoIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom>
              Subscription Benefits
            </Typography>
            <Divider style={{ marginBottom: "15px" }} />
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Directly contribute to carbon offset projects." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Support NGOs working towards a greener future." />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Reduce your carbon footprint and make a difference." />
            </ListItem>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        elevation={3}
        style={{ padding: "20px", marginBottom: "20px", borderRadius: "15px" }}
      >
        <Typography variant="h5" gutterBottom>
          Projects You're Contributing To for Carbon Compensation
        </Typography>
        <Divider style={{ marginBottom: "15px" }} />
        <Grid container spacing={3}>
          {selectedOffsets
            .slice((page - 1) * 3, page * 3)
            .map((offsetTitle, index) => {
              const project = projects.find((p) => p.title === offsetTitle);
              return (
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
              );
            })}
        </Grid>
        <Box mt={3}>
          <Pagination
            count={Math.ceil(selectedOffsets.length / 3)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </Paper>

      {/* ... [rest of the code below] */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Why Subscribe?</DialogTitle>
        <DialogContent>
          <Typography variant="body1" paragraph>
            By subscribing, you compensate for your current carbon emissions
            that you can't or aren't able to reduce. Greenquest commits to
            donating all collected funds (excluding fees) to NGOs working
            towards decarbonization.
          </Typography>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default OffsetSettings;
