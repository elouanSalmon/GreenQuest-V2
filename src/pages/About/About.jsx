import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function About() {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          About My Carbon Footprint App
        </Typography>
        <Typography variant="body1" paragraph>
          My Carbon Footprint App is an application designed to help individuals assess their carbon footprint, learn how to reduce their carbon impact, and offset their emissions through a monthly subscription. This subscription will donate funds to carbon capture associations.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to raise awareness about the environmental impact of our daily actions and provide easy-to-use tools for individuals to make a positive change.
        </Typography>
      </Box>
    </Container>
  );
}

export default About;
