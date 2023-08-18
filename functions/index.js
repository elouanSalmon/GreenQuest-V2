/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Stripe = require("stripe");

admin.initializeApp();
const db = admin.firestore();

const stripe = new Stripe("YOUR_STRIPE_SECRET_KEY");

exports.scheduledPayment = functions.pubsub
  .schedule("every day 00:00")
  .timeZone("Europe/Paris")
  .onRun(async (context) => {
    const today = new Date();
    const usersToRenew = await db
      .collection("users")
      .where("renewalDate", "==", today)
      .get();

    for (let userDoc of usersToRenew.docs) {
      const user = userDoc.data();

      // Récupérez totalEmissions pour l'utilisateur
      const emissionsDoc = await db
        .collection("carbon-footprint")
        .doc(userDoc.id)
        .get();
      const totalEmissions = emissionsDoc.data().totalEmissions;

      // Calculez le montant basé sur totalEmissions
      // (Assumant une fonction calculateAmount pour cette étape)
      const amount = calculateAmount(totalEmissions);

      // TODO: Utilisez l'API Stripe pour déclencher le paiement en utilisant l'ID client de Stripe stocké pour cet utilisateur
      // (e.g., stripe.invoices.create(...) ou d'autres méthodes pertinentes)

      // Mettez à jour la date de renouvellement pour le mois prochain
      const renewalDate = new Date();
      renewalDate.setMonth(renewalDate.getMonth() + 1);
      await userDoc.ref.update({ renewalDate });
    }

    return null;
  });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
