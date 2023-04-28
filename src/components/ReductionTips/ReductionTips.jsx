import React from 'react';
import { Typography, List, ListItem, ListItemText, Box } from '@mui/material';

const tips = [
  { id: 1, content: 'Reduce, reuse, and recycle.' },
  { id: 2, content: 'Use energy-efficient appliances and light bulbs.' },
  { id: 3, content: 'Save water by fixing leaks and using water-saving appliances.' },
  { id: 4, content: 'Drive less and use public transportation, carpool, walk, or bike.' },
  { id: 5, content: 'Eat locally sourced, organic, and plant-based foods.' },
  // Add more tips as desired
];

function ReductionTips() {
  return (
    <Box my={4}>
      <Typography variant="h5" component="h2" gutterBottom>
        Reduction Tips
      </Typography>
      <List>
        {tips.map((tip) => (
          <ListItem key={tip.id}>
            <ListItemText primary={tip.content} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ReductionTips;
