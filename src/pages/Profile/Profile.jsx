import React from 'react';
import { Container, Typography, Box } from '@mui/material';

function Profile() {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Profile
        </Typography>
        <Typography variant="body1" paragraph>
          This is your profile page. Here, you can view your personal information and manage your subscription.
        </Typography>
        {/* Add your user information display and subscription management components here */}
      </Box>
    </Container>
  );
}

export default Profile;
