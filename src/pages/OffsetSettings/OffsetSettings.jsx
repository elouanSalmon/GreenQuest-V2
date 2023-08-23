import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Switch,
  TextField,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { db, auth } from "../../services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const OffsetSettings = () => {
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isAnnual, setIsAnnual] = useState(false);
  const [totalEmissions, setTotalEmissions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userId = auth.currentUser.uid;
      const docRef = doc(db, "carbon-footprint", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSelectedProjects(data.selectedProjects || []);
        setSelectedPlan(data.selectedPlan || "");
        setIsAnnual(data.isAnnual || false);
        setTotalEmissions(data.totalEmissions || 0);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    const userId = auth.currentUser.uid;
    const userDocRef = doc(db, "offset-settings", userId);
    await setDoc(userDocRef, {
      selectedProjects,
      selectedPlan,
      isAnnual,
      totalEmissions,
    });
    alert("Settings saved!");
  };

  return (
    <Container>
      <Typography variant="h3" mb={4}>
        Offset Settings
      </Typography>

      <Box mb={4}>
        <Typography variant="h5">Selected Projects:</Typography>
        <Grid container spacing={2}>
          {selectedProjects.map((project, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={project.image}
                    alt={project.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{project.title}</Typography>
                  </CardContent>
                </CardActionArea>
                <IconButton aria-label="info">
                  <InfoIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mb={4}>
        <Typography variant="h5">Selected Plan:</Typography>
        <FormControl component="fieldset">
          <RadioGroup value={selectedPlan}>
            <FormControlLabel
              value="100"
              control={<Radio />}
              label="100% of my footprint"
            />
            <FormControlLabel
              value="120"
              control={<Radio />}
              label="120% of my footprint"
            />
            <FormControlLabel
              value="200"
              control={<Radio />}
              label="200% of my footprint"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box mb={4}>
        <Typography variant="h5">Payment Plan:</Typography>
        <Switch
          checked={isAnnual}
          onChange={() => setIsAnnual(!isAnnual)}
          color="primary"
        />
        <Typography>{isAnnual ? "Annually" : "Monthly"}</Typography>
      </Box>

      <Button variant="contained" color="primary" onClick={handleSave}>
        Save Settings
      </Button>
    </Container>
  );
};

export default OffsetSettings;
