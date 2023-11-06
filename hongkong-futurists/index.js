/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  // Check if request is made by an admin
  if (context.auth.token.admin !== true) {
    return { error: 'Only admins can add other admins, sucker!' };
  }

  // Get user and add custom claim (admin)
  return admin.auth().getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin.`
      };
    })
    .catch(err => {
      return err;
    });
});
