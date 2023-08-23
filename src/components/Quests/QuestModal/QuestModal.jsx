import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const QuestModal = ({ open, handleClose, selectedQuest, currentEmissions, targetEmissions }) => {
  const reductionPotential = currentEmissions - targetEmissions;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {selectedQuest?.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {selectedQuest?.description}
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Current Emissions: {currentEmissions.toFixed(1)} t CO2e/year
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Target Emissions: {targetEmissions.toFixed(1)} t CO2e/year
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Reduction Potential: {reductionPotential.toFixed(1)} t CO2e/year
        </Typography>
        <Button sx={{ mt: 2 }} onClick={handleClose}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default QuestModal;
