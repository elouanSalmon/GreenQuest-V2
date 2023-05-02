import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box } from '@mui/system';

const QuestCard = ({ quest, userCarbonFootprint }) => {
  console.log('Rendering QuestCard:', quest);
  const currentEmissions = userCarbonFootprint[`${quest.category}Emissions`];
  const targetEmissions = quest.target_carbon_consumption;

  const getSmileyIcon = () => {
    if (currentEmissions > targetEmissions) {
      return <SentimentVeryDissatisfiedIcon color="error" />;
    } else if (currentEmissions === targetEmissions) {
      return <SentimentDissatisfiedIcon color="warning" />;
    } else {
      return <SentimentVerySatisfiedIcon color="success" />;
    }
  };

  const getReductionArrow = () => {
    const largeReductionThreshold = 0.3; // Set your own threshold value (in t CO2e)

    if (currentEmissions - targetEmissions > largeReductionThreshold) {
      return <ArrowDownwardIcon color="success" />;
    } else {
      return <ArrowDownwardIcon color="warning" />;
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={quest.imageUrl}
        title={quest.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {quest.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Current Emissions: {currentEmissions.toFixed(1)} t CO2e/year
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Target Emissions: {targetEmissions.toFixed(1)} t CO2e/year
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Emissions compared to target:
          </Typography>
          {getSmileyIcon()}
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Reduction potential:
          </Typography>
          {getReductionArrow()}
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small">Start</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default QuestCard;

