import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { getStripeInstance } from "../../services/stripe";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { auth, db } from "../../services/firebase"; // Import auth and db
import { doc, setDoc } from "firebase/firestore"; // Import Firestore methods
import { useNavigate } from "react-router-dom";

const Payment = ({ cost }) => {
  const [stripe, setStripe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getStripeInstance().then((stripe) => {
      setStripe(stripe);
    });
  }, []);

  const handlePaymentSuccess = async (paymentMethod) => {
    // Handle successful payment here
    console.log("Payment successful!", paymentMethod);

    // Get current user's ID
    const userId = auth.currentUser.uid;

    // Reference to the user's document in Firestore
    const userRef = doc(db, "users", userId);

    // Define the renewal date as one month from now
    const renewalDate = new Date();
    renewalDate.setMonth(renewalDate.getMonth() + 1);

    // Update the user's data in Firestore
    await setDoc(
      userRef,
      {
        isSubscriber: true,
        stripePaymentMethodId: paymentMethod.id,
        renewalDate: renewalDate,
      },
      { merge: true }
    );

    navigate("/payment-successful");
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h3" align="center" mb={2}>
        Payment
      </Typography>
      <Typography variant="h5" align="center" mb={4}>
        Please enter your payment information
      </Typography>
      <Typography variant="h6" align="center" mb={4}>
        Total: ${cost} {/* Display the cost */}
      </Typography>
      <Elements stripe={stripe}>
        {stripe ? (
          <CheckoutForm
            cost={cost} // Pass the cost to the CheckoutForm
            handlePaymentSuccess={handlePaymentSuccess}
          />
        ) : (
          <Typography>Loading Stripe...</Typography>
        )}
      </Elements>
    </Container>
  );
};

export default Payment;
