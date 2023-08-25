import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebase';

const SignIn = ({ onAuthenticated }) => {
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        if (!user.email.endsWith(".edu")) {
          alert("Please use a .edu email address!");
          auth.signOut();
        } else {
          onAuthenticated();
        }
      })
      .catch((error) => {
        console.error("Error during Google sign-in:", error);
      });
  }

  return (
    <div className="sign-in-container">
      <h2>Welcome to HK Future Leaders Organization</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
