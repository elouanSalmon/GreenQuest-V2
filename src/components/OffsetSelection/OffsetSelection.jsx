import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { styled } from '@mui/system';
import { auth, firestore } from '../../services/firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';

const projects = [
  {
    title: 'Tree planting projects',
    image: 'tree_planting.jpg',
  },
  {
    title: 'Solar power projects',
    image: 'solar_power.jpg',
  },
  {
    title: 'Direct air capture',
    image: 'direct_air_capture.jpg',
  },
  {
    title: 'Hydro power projects',
    image: 'hydro_power.jpg',
  },
  {
    title: 'Clean cook stoves',
    image: 'clean_cook_stoves.jpg',
  },
  {
    title: 'Deforestation prevention',
    image: 'deforestation_prevention.jpg',
  },
];

const StyledCardActionArea = styled(CardActionArea)(({theme}) => ({
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.3s ease',
    '& .MuiCardMedia-root': {
      filter: 'grayscale(100%)',
    },
  },
}));

const OffsetSelection = ({ onContinue }) => {

  const handleContinue = async () => {
    const selectedProjects = projects.filter((_, index) => selected.includes(index)).map(project => project.title);
    
    // Get the current user's unique ID (assuming the user is already authenticated)
    const userId = auth.currentUser.uid;

    // Create a reference to the user's document in the "offset-selection" collection
    const userDocRef = doc(firestore, 'offset-selection', userId);

    // Check if the document exists
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      // Update the document with the new selected projects
      await setDoc(userDocRef, { selectedProjects }, { merge: true });
    } else {
      // Create a new document for the user with their selected projects
      await setDoc(userDocRef, { selectedProjects });
    }

    onContinue(selectedProjects);
  };
  
  const [selected, setSelected] = useState([]);

  const handleSelect = (index) => {
    const newSelected = [...selected];
    if (newSelected.includes(index)) {
      newSelected.splice(newSelected.indexOf(index), 1);
    } else {
      newSelected.push(index);
    }
    setSelected(newSelected);
  };

  const renderProjectCards = () =>
    projects.map((project, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card
          onClick={() => handleSelect(index)}
          sx={{
            position: 'relative',
            borderColor: selected.includes(index) ? 'primary.main' : 'transparent',
            borderWidth: 2,
            borderStyle: 'solid',
            borderRadius: 2,
            boxShadow: selected.includes(index) ? 6 : 1,
          }}
        >
          <StyledCardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={project.image}
              alt={project.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {project.title}
      </Typography>
        </CardContent>
      </StyledCardActionArea>
      <IconButton
        aria-label="info"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
        }}
      >
        <InfoIcon />
      </IconButton>
    </Card>
  </Grid>
));
return (
<Box>
<Typography variant="h3" align="center" mb={2}>
Select
</Typography>
<Typography variant="h5" align="center" mb={4}>
Which offsetting project types are most important to you?
</Typography>
<Grid container spacing={2}>
{renderProjectCards()}
</Grid>
<Box mt={4} display="flex" justifyContent="center">
<Button
variant="contained"
color="primary"
disabled={selected.length === 0}
onClick={handleContinue}
>
Continue
</Button>
</Box>
</Box>
);
};

export default OffsetSelection;             
