// src/components/QuestCard/QuestCard.jsx
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
import { Box } from '@mui/system';

const QuestCard = ({ quest }) => {
  const getSmileyIcon = (currentEmissions, averageEmissions) => {
    if (currentEmissions > averageEmissions) {
      return <SentimentVeryDissatisfiedIcon color="error" />;
    } else if (currentEmissions === averageEmissions) {
      return <SentimentDissatisfiedIcon color="warning" />;
    } else {
      return <SentimentVerySatisfiedIcon color="success" />;
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
          Current Emissions: {(quest.currentEmissions / 1000).toFixed(1)} t CO2e/year
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Potential Reduction: {(quest.potentialReduction / 1000).toFixed(1)} t CO2e/year
        </Typography>
        <Box display="flex" alignItems="center">
          <Typography variant="body2" color="text.secondary">
            Emissions compared to average:
          </Typography>
          {getSmileyIcon(quest.currentEmissions, quest.averageEmissions)}
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
