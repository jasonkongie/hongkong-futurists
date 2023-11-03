// /api/profile.js  

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// Note: Replace 'path/to/serviceAccountKey.json' with the actual path to your Firebase service account key file.
// Ensure that you do not expose your service account key in your version control.
if (!admin.apps.length) {
  const serviceAccount = require('path/to/serviceAccountKey.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    // Assuming the email to generate a sign-in link for is in the body of the POST request
    const { email } = req.body;

    if (!email) {
      return res.status(400).send('Email is required');
    }

    const actionCodeSettings = {
      // The URL to redirect to after the user completes the sign-up process.
      url: 'https://hongkong-futurists.vercel.app/finishSignUp', // Replace with your redirect URL
      handleCodeInApp: true,
    };

    try {
      const link = await admin.auth().generateSignInWithEmailLink(email, actionCodeSettings);
      // You can now send this link to the user's email using a mailing service like SendGrid, Nodemailer, etc.
      res.status(200).json({ authLink: link });
    } catch (error) {
      console.error('Error generating sign-in link:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
