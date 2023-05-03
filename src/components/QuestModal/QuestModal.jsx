import React from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography, Button } from '@mui/material';
import { getSmileyIcon, getReductionArrow } from '../QuestCard/QuestCard';

const QuestModal = ({ open, handleClose, selectedQuest, currentEmissions, targetEmissions }) => {
  if (!selectedQuest) return null;

  return (
    open && (
      <div className="quest-modal-container">
        {selectedQuest.image && (
          <Box
            sx={{
              width: '100%',
              height: 140,
              backgroundImage: `url(src/assets/images/quests/${selectedQuest.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
            title={selectedQuest.title}
          >
            <IconButton
              edge="start"
              color="white"
              onClick={handleClose}
              aria-label="go back"
              sx={{ position: 'absolute', left: 20, top: 0, marginTop: '0mm' }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography id="quest-modal-title" variant="h4" component="h2" sx={{ position: 'absolute', bottom: 0, left: '20px', color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
              {selectedQuest.title}
            </Typography>
          </Box>
        )}
        )}
        <Box display="flex" alignItems="center">
          <Box sx={{ mr: 1, alignSelf: 'center' }}>{getSmileyIcon(currentEmissions, targetEmissions)}</Box>
          <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
            Current Emissions: {currentEmissions.toFixed(1)} t CO2e/year
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Box sx={{ mr: 1, alignSelf: 'center' }}>{getReductionArrow(currentEmissions, targetEmissions)}</Box>
          <Typography variant="body2" color="text.secondary" sx={{ alignSelf: 'center' }}>
            Target Emissions: {targetEmissions.toFixed(1)} t CO2e/year
          </Typography>
        </Box>
        <Typography id="quest-modal-description" variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {selectedQuest.description}
        </Typography>
        <Button color="primary" variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
          Start
        </Button>
      </div>
    )
  );
};

export default QuestModal;