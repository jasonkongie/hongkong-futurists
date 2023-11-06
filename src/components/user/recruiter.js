const admin = require('firebase-admin');
const { getFirestore } = require('firebase-admin/firestore');

// Initialize Firebase Admin SDK
// Usually, you'd initialize Firebase Admin with a service account in a secure environment
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://your-database-url.firebaseio.com'
// });

const db = getFirestore();

class RecruiterUtils {
  // Function to generate a custom sign-up token for a recruiter
  static async generateSignupToken(recruiterEmail) {
    // Here you would check if the email is allowed to be a recruiter
    // For example, you could have a list of allowed emails in Firestore
    const allowedRecruitersRef = db.collection('allowedRecruiters');
    const snapshot = await allowedRecruitersRef.where('email', '==', recruiterEmail).get();

    if (snapshot.empty) {
      throw new Error('This email is not allowed to sign up as a recruiter.');
    }

    // Generate a custom token with recruiter claims
    const token = await admin.auth().createCustomToken(recruiterEmail, { recruiter: true });
    return token;
  }

  // Function to create a recruiter profile in Firestore
  static async createRecruiterProfile(userId, recruiterData) {
    const recruiterRef = db.collection('recruiters').doc(userId);
    await recruiterRef.set(recruiterData);
  }

  // Function to check if a user is a recruiter
  static async isUserRecruiter(userId) {
    const recruiterRef = db.collection('recruiters').doc(userId);
    const doc = await recruiterRef.get();
    return doc.exists;
  }
}

module.exports = RecruiterUtils;




//Usage
// const RecruiterUtils = require('./RecruiterUtils');

// async function getRecruiterSignupToken(email) {
//   try {
//     const token = await RecruiterUtils.generateSignupToken(email);
//     console.log('Signup token for recruiter:', token);
//     // Send this token to the recruiter's email or display it securely for them to use
//   } catch (error) {
//     console.error('Error generating signup token:', error);
//   }
// }

// // Example usage
// getRecruiterSignupToken('recruiter@example.com');
