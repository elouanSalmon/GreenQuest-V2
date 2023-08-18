// Commented out due to non-usage:
// const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();
const db = admin.firestore();

const stripe = new Stripe(functions.config().stripe.secret);

const calculateAmount = (totalEmissions) => {
  return totalEmissions;
};

exports.scheduledPayment = functions.pubsub
  .schedule("every day 00:00")
  .timeZone("Europe/Paris")
  .onRun(async (context) => {
    const today = new Date().toISOString().split("T")[0];
    const usersToRenew = await db
      .collection("users")
      .where("renewalDate", "==", today)
      .get();

    for (const userDoc of usersToRenew.docs) {
      const user = userDoc.data();

      const emissionsDoc = await db
        .collection("carbon-footprint")
        .doc(userDoc.id)
        .get();
      const totalEmissions = emissionsDoc.data().totalEmissions;

      const amount = calculateAmount(totalEmissions);

      const customerId = user.stripeCustomerId;
      if (!customerId) {
        logger.warn(`No Stripe customer ID found for user ${userDoc.id}`);
        continue;
      }

      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount * 100,
          currency: "eur",
          customer: customerId,
          description: `Paiement pour ${totalEmissions} tonnes`,
        });

        if (paymentIntent.status !== "succeeded") {
          logger.error(`Failed to process payment for user ${userDoc.id}`);
          continue;
        }
      } catch (error) {
        logger.error(
          `Error processing payment for user ${userDoc.id}: `,
          error.message
        );
        continue;
      }

      const renewalDate = new Date();
      renewalDate.setMonth(renewalDate.getMonth() + 1);
      await userDoc.ref.update({ renewalDate });
    }

    return { status: "success", processedUsers: usersToRenew.docs.length };
  });

exports.createStripeCustomer = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const email = data.email;
  if (!email) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Email is required."
    );
  }

  try {
    const customer = await stripe.customers.create({ email });
    await db
      .collection("users")
      .doc(context.auth.uid)
      .set({ stripeCustomerId: customer.id }, { merge: true });
    return { customerId: customer.id };
  } catch (error) {
    throw new functions.https.HttpsError("unknown", error.message);
  }
});
