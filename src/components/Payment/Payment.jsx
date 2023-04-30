import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '../../services/stripe';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const Payment = () => {
  const [stripeLoaded, setStripeLoaded] = useState(false);

  const handlePaymentSuccess = async (paymentMethod) => {
    // Handle successful payment here (e.g., send payment data to your backend)
  };

  return (
    <Box>
      <Typography variant="h3" align="center" mb={2}>
        Payment
      </Typography>
      <Typography variant="h5" align="center" mb={4}>
        Please enter your payment information
      </Typography>
      <Elements
        stripe={getStripe()}
        options={{
        }}
        onReady={() => {
          setStripeLoaded(true);
        }}
      >
        {stripeLoaded ? (
          <CheckoutForm handlePaymentSuccess={handlePaymentSuccess} />
        ) : (
          <Typography>Loading Stripe...</Typography>
        )}
      </Elements>
    </Box>
  );
};

export default Payment;
