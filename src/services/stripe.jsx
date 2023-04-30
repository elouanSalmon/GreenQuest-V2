import { loadStripe } from '@stripe/stripe-js';

const publishableKey = 'pk_test_51IQy5VIgdWguJODKLBhqBVj6tXkQKuY3tBtyaKybHYb5gcQACXBuKUydjUSIxFPngC2X9L6oeiJa57O5VecwV7cF00NUke2cpX';

let stripePromise;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};
