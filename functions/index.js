// Remove the unused imports if you are not using them anywhere else
// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.generateAuthLink = functions.https.onCall(async (data, context) => {
  const email = data.email;
  if (!email) {
    throw new functions.https.HttpsError(
        "invalid-argument",
        "Email is required.",
    );
  }

  const actionCodeSettings = {
    url: "https://hongkong-futurists.vercel.app/profileCreation", // The URL to redirect to after email verification
    handleCodeInApp: true,
  };

  try {
    const link = await admin.auth().generateSignInWithEmailLink(
        email,
        actionCodeSettings,
    );
    return {authLink: link};
  } catch (error) {
    throw new functions.https.HttpsError(
        "internal",
        "Error generating sign-in link.",
    );
  }
});
