import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, firestore } from '../firebase'; // Ensure these paths are correct
import { doc, getDoc, setDoc } from 'firebase/firestore';
import './SignIn.css'; // Ensure this contains only the styles for the button
import collegeData from './colleges.json'; // Import the college data

const SignIn = ({ signIn }) => { 
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const emailDomain = user.email.split('@')[1];

      if (!user.email.endsWith(".edu") || !collegeData[emailDomain]) {
        alert("Please use a valid .edu email address from a supported college!");
        await auth.signOut();
      } else {
        const userRef = doc(firestore, 'users', user.uid);
        const docSnap = await getDoc(userRef);

        if (!docSnap.exists()) {
          // User not registered, attempt to create a new document
          const profileData = {
            name: user.displayName,
            name_lowercase: user.displayName.toLowerCase(), // Store the lowercase name
            email: user.email,
            profilePicUrl: user.photoURL,
            college: collegeData[emailDomain], // Use the college name from the JSON data
          };

          // Test: Output the profile metadata to the console
          console.log('Profile metadata:', profileData);

          await setDoc(userRef, profileData);
          // Redirect to the user's profile page with edit mode
          window.location.href = `/directory`;
        } else {
          // Redirect to the user's profile page without edit mode
          window.location.href = `/directory`;
        }
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  const buttonText = signIn ? 'Sign up with Google' : 'Log In';

  return (
    <button className="sign-in-button" onClick={signInWithGoogle}> {buttonText} </button>
  );
};

export default SignIn;
