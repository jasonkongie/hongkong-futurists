const admin = require('firebase-admin');

// Initialize Firebase Admin with proper credentials
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://hongkong-futurists.firebaseio.com'
});

const db = admin.firestore();

//
async function addLowercaseNameToUsers() {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();

  const updates = [];
  snapshot.forEach(doc => {
    const userData = doc.data();
    if (userData.name && !userData.name_lowercase) {
      // Add the update promise to an array
      updates.push(doc.ref.update({
        name_lowercase: userData.name.toLowerCase()
      }));
    }
  });

  // Wait for all updates to complete
  await Promise.all(updates);
  console.log('All users have been updated with name_lowercase field.');
}



//main
addLowercaseNameToUsers().catch(console.error);
