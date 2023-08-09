import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box } from "@mui/system";

export const getSmileyIcon = (currentEmissions, targetEmissions) => {
  if (currentEmissions > targetEmissions) {
    return <SentimentVeryDissatisfiedIcon color="error" />;
  } else if (currentEmissions === targetEmissions) {
    return <SentimentDissatisfiedIcon color="warning" />;
  } else {
    return <SentimentVerySatisfiedIcon color="success" />;
  }
};

export const getReductionArrow = (currentEmissions, targetEmissions) => {
  const largeReductionThreshold = 0.3; // Set your own threshold value (in t CO2e)

  if (currentEmissions - targetEmissions > largeReductionThreshold) {
    return <ArrowDownwardIcon color="success" />;
  } else {
    return <ArrowDownwardIcon color="warning" />;
  }
};

const QuestCard = ({ quest, userCarbonFootprint, handleOpen }) => {
  const currentEmissions = useMemo(
    () => userCarbonFootprint?.[`${quest.category}Emissions`] || 0,
    [userCarbonFootprint, quest.category]
  );
  const targetEmissions = useMemo(
    () => parseFloat(quest?.target_carbon_consumption) || 0,
    [quest]
  );

  return (
    <Card sx={{ maxWidth: 345 }}>
      {quest.image && (
        <CardMedia
          sx={{ height: 140 }}
          image={`src/assets/images/quests/${quest.image}`}
          title={quest.title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {quest.title}
        </Typography>
        <Box display="flex" alignItems="center">
          {getSmileyIcon(currentEmissions, targetEmissions)}
          <Typography variant="body2" color="text.secondary">
            Current Emissions: {currentEmissions.toFixed(1)} t CO2e/year
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          {getReductionArrow(currentEmissions, targetEmissions)}
          <Typography variant="body2" color="text.secondary">
            Target Emissions: {targetEmissions.toFixed(1)} t CO2e/year
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Start</Button>
        <Button size="small" onClick={() => handleOpen(quest)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default QuestCard;
