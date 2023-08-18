import { loadStripe } from "@stripe/stripe-js";
import { db } from "./firebase";

const publishableKey =
  "pk_test_51IQy5VIgdWguJODKLBhqBVj6tXkQKuY3tBtyaKybHYb5gcQACXBuKUydjUSIxFPngC2X9L6oeiJa57O5VecwV7cF00NUke2cpX";

let stripePromise;

export const getStripeInstance = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Create a Stripe customer
export const createStripeCustomer = async (email) => {
  const stripe = await getStripeInstance();
  const customer = await stripe.customers.create({ email });
  return customer.id;
};

// Create a subscription for the customer
export const createSubscription = async (customerId, priceId) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      expand: ["latest_invoice.payment_intent"],
    });
    return subscription;
  } catch (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
};

// Update the subscription amount (this assumes you have different price IDs for different amounts)
export const updateSubscriptionAmount = async (subscriptionId, newPriceId) => {
  const updatedSubscription = await stripe.subscriptions.update(
    subscriptionId,
    {
      items: [
        {
          id: subscriptionId,
          price: newPriceId,
        },
      ],
    }
  );
  return updatedSubscription;
};
