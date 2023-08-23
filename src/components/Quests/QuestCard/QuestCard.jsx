import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box } from "@mui/system";
import Chip from "@mui/material/Chip";
import EventNoteIcon from "@mui/icons-material/EventNote";
import InfoIcon from "@mui/icons-material/Info";

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

  const isQuestCompleted = startedQuests.some(
    (q) => q.questId === quest.id && q.status === "completed"
  );

  const questData = startedQuests.find((q) => q.questId === quest.id);
  const startedAtDate = questData?.startedAt?.toDate();
  const completedAtDate = questData?.completedAt?.toDate();

  return (
    <Card sx={{ position: "relative" }}>
      {quest.image && (
        <CardMedia
          sx={{ height: 140 }}
          image={`/src/assets/images/quests/${quest.image}`}
          title={quest.title}
        />
      )}
      <IconButton
        sx={{
          position: "absolute",
          top: 8, // petite marge du haut
          right: 8, // petite marge de droite
          color: "secondary.main", // couleur de l'icône
          backgroundColor: "white", // fond blanc pour le bouton
          zIndex: 1, // pour s'assurer qu'il apparaît au-dessus des autres éléments
          padding: 0.5, // réduire le padding pour diminuer l'espace blanc autour de l'icône
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.7)", // effet de transparence au survol
          },
        }}
        onClick={() => handleOpen(quest)}
      >
        <InfoIcon />
      </IconButton>
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
        <Box display="flex" flexDirection="column" alignItems="start">
          <Box display="flex" alignItems="center">
            {getReductionArrow(currentEmissions, targetEmissions)}
            <Typography variant="body2" color="text.secondary">
              Target Emissions:{" "}
              {targetEmissions ? targetEmissions.toFixed(1) : 0} t CO2e/year
            </Typography>
          </Box>
          {isQuestCompleted && completedAtDate && (
            <Chip
              icon={<EventNoteIcon />}
              label={`Completed on: ${completedAtDate.toLocaleDateString()}`}
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
            />
          )}
          {isQuestStarted && startedAtDate && (
            <Chip
              icon={<EventNoteIcon />}
              label={`Started on: ${startedAtDate.toLocaleDateString()}`}
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
            />
          )}
        </Box>
      </CardContent>
      <CardActions>
        {!isQuestStarted && !isQuestCompleted && (
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
      </CardActions>
    </Card>
  );
};

export default QuestCard;
