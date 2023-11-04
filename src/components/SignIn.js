import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, firestore } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './SignIn.css'; // This line should be at the top of your SignIn.js file
import collegeData from './colleges.json' // Import the college data

const SignIn = () => {
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const emailDomain = user.email.split('@')[1];

        if (!user.email.endsWith(".edu") || !collegeData[emailDomain]) {
          alert("Please use a valid .edu email address from a supported college!");
          auth.signOut();
        } else {
          const userRef = doc(firestore, 'users', user.uid);
          const docSnap = await getDoc(userRef);
  
          if (!docSnap.exists()) {
            // User not registered, attempt to create a new document
            const profileData = {
              name: user.displayName,
              email: user.email,
              profilePicUrl: user.photoURL,
              college: collegeData[emailDomain], // Use the college name from the JSON data
            };
  
            // Test: Output the profile metadata to the console
            console.log('Profile metadata:', profileData);
  
            await setDoc(userRef, profileData);
            // Redirect to the user's profile page with edit mode
            window.location.href = `/profile/${user.uid}`;
          } else {
            // Redirect to the user's profile page without edit mode
            window.location.href = `/profile/${user.uid}`;
          }
        }
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error);
      });
  };

  return (
    <div className="sign-in-container">
      <h2>Welcome to Hong Kong Futurists Network</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
