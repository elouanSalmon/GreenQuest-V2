import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Footer = () => {
  return (
    <Box mt={5} mb={5}>
      <Container>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          CarbonQuest {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
