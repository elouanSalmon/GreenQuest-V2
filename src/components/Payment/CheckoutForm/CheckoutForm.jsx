import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  createStripeCustomer,
  createSubscription,
} from "../../../services/stripe";
import { auth, saveStripeCustomerId } from "../../../services/firebase";

const CheckoutForm = ({ handlePaymentSuccess }) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [email, setEmail] = useState(auth.currentUser?.email || "");

  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Roboto, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      setError(null);
      await handlePaymentSuccess(paymentMethod);
      setProcessing(false);

      // Remplacez la logique de création du client Stripe par un appel à la fonction Firebase
      try {
        const { customerId } = await createStripeCustomer({ email });
        // Create a subscription for the customer (you'll need a price ID from Stripe)
        const subscription = await createSubscription(
          customerId,
          "your_price_id"
        );
        // Handle the subscription result as needed
      } catch (error) {
        console.error("Error creating Stripe customer:", error);
      }
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
        </Box>
        <Box mb={3}>
          <CardElement options={cardElementOptions} />
        </Box>
        <Box mb={2}>
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!stripe || processing}
        >
          {processing ? "Processing..." : "Pay"}
        </Button>
      </form>
    </Box>
  );
};

export default CheckoutForm;
