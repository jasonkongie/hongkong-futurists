import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, firestore } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

// Define a Profile class to hold user profile information
class Profile {
  constructor(name = '', email = '', profilePicUrl = '') {
    this.name = name;
    this.email = email;
    this.profilePicUrl = profilePicUrl;
  }
}

const SignIn = () => {
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        if (!user.email.endsWith(".edu")) {
          alert("Please use a .edu email address!");
          auth.signOut();
        } else {
          const userRef = doc(firestore, 'users', user.uid);
          const docSnap = await getDoc(userRef);
  
          if (!docSnap.exists()) {
            // User not registered, attempt to create a new document
            const newUserProfile = new Profile(user.displayName, user.email, user.photoURL);
  
            // Convert the Profile instance to a plain object
            const profileData = {
              name: newUserProfile.name,
              email: newUserProfile.email,
              profilePicUrl: newUserProfile.profilePicUrl,
            };
  
            // Test: Output the profile metadata to the console
            console.log('Profile metadata:', profileData);
  
            setDoc(userRef, profileData)
              .then(() => {
                // Pass the user profile to the profile creation page
                window.location.href = `/profile-creation?name=${encodeURIComponent(profileData.name)}&email=${encodeURIComponent(profileData.email)}&profilePicUrl=${encodeURIComponent(profileData.profilePicUrl)}`;
              })
              .catch((error) => {
                console.error("Error writing document to Firestore:", error);
              });
          } else {
            // If you need to perform actions after the user is found to be already registered, do it here.
            // For example, redirect to a dashboard or home page.
            window.location.href = '/dashboard'; // Replace with your path
          }
        }
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error);
      });
  };
  

  return (
    <div className="sign-in-container">
      <h2>Welcome to HK Future Leaders Organization</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
