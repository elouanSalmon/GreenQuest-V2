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

const Quests = () => {
  const quests = [
    {
      title: 'Quest 1',
      currentEmissions: 1000,
      potentialReduction: 500,
      imageUrl: 'https://via.placeholder.com/150',
      averageEmissions: 1500,
    },
    // Add more quests here
  ];

  const getSmileyIcon = (currentEmissions, averageEmissions) => {
    if (currentEmissions > averageEmissions) {
      return <SentimentVeryDissatisfiedIcon color="error" />;
    } else if (currentEmissions === averageEmissions) {
      return <SentimentDissatisfiedIcon color="warning" />;
    } else {
      return <SentimentVerySatisfiedIcon color="success" />;
    }
  };

  const getReductionArrow = (potentialReduction) => {
    const largeReductionThreshold = 300; // You can set your own threshold value

    if (potentialReduction > largeReductionThreshold) {
      return <ArrowDownwardIcon color="success" />;
    } else {
      return <ArrowDownwardIcon color="warning" />;
    }
  };

  return (
    <div>
      {quests.map((quest, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 140 }}
            image={quest.imageUrl}
            title={quest.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {quest.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="span">
              Current Emissions: {(quest.currentEmissions / 1000).toFixed(1)} t CO2e/year
            </Typography>
            <Box component="span" ml={1}>
              {getSmileyIcon(quest.currentEmissions, quest.averageEmissions)}
            </Box>
            <Typography variant="body2" color="text.secondary">
              Potential Reduction: {(quest.potentialReduction / 1000).toFixed(1)} t CO2e/year {getReductionArrow(quest.potentialReduction)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Start</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Quests;