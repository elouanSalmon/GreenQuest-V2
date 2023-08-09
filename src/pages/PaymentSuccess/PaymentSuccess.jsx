// PaymentSuccess.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const PaymentSuccess = () => {
  return (
    <Box>
      <Typography variant="h3" align="center" mb={2}>
        Thank You!
      </Typography>
      <Typography variant="h5" align="center" mb={4}>
        Your subscription has been successfully processed.
      </Typography>
    </Box>
  );
};

export default PaymentSuccess;
