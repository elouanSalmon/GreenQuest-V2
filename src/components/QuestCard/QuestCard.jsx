import React from "react";
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
  const largeReductionThreshold = 0.3;
  if (currentEmissions - targetEmissions > largeReductionThreshold) {
    return <ArrowDownwardIcon color="success" />;
  } else {
    return <ArrowDownwardIcon color="warning" />;
  }
};

const QuestCard = ({
  quest,
  userCarbonFootprint,
  targetEmissions,
  handleOpen,
  handleComplete,
  handleStart,
  startedQuests = [],
  handleCancel,
}) => {
  const currentEmissions =
    userCarbonFootprint && userCarbonFootprint[quest.category]
      ? userCarbonFootprint[quest.category]
      : 0;

  const isQuestStarted = startedQuests.some(
    (q) => q.questId === quest.id && q.status === "started"
  );

  return (
    <Card sx={{ maxWidth: 345 }}>
      {quest.image && (
        <CardMedia
          sx={{ height: 140 }}
          image={`/src/assets/images/quests/${quest.image}`}
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
            Current Emissions:{" "}
            {currentEmissions ? currentEmissions.toFixed(1) : 0} t CO2e/year
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          {getReductionArrow(currentEmissions, targetEmissions)}
          <Typography variant="body2" color="text.secondary">
            Target Emissions: {targetEmissions ? targetEmissions.toFixed(1) : 0}{" "}
            t CO2e/year
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        {!isQuestStarted && (
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => handleStart(quest)}
          >
            Start
          </Button>
        )}
        {isQuestStarted && (
          <>
            <Button
              size="small"
              color="primary"
              variant="contained"
              onClick={() => handleComplete(quest)}
            >
              Complete
            </Button>
            <Button
              size="small"
              color="secondary"
              variant="outlined"
              onClick={() => handleCancel(quest)}
            >
              Cancel
            </Button>
          </>
        )}
        <Button size="small" color="primary" onClick={() => handleOpen(quest)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default QuestCard;
