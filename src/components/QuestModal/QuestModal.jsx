import React from 'react';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, Button } from '@mui/material';

const QuestModal = ({ open, handleClose, selectedQuest }) => {
  if (!selectedQuest) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="quest-modal-title"
      aria-describedby="quest-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 0, top: 0 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="quest-modal-title" variant="h6" component="h2">
          {selectedQuest.title}
        </Typography>
        <Typography id="quest-modal-description" variant="body2" color="text.secondary">
          {selectedQuest.description}
        </Typography>
        <Button color="primary" variant="contained" onClick={handleClose} sx={{ mt: 2 }}>
          Start
        </Button>
      </Box>
    </Modal>
  );
};

export default QuestModal;
