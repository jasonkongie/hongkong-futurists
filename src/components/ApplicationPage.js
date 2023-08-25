import React, { useEffect } from 'react';
import { signInWithRedirect, getRedirectResult, GoogleAuthProvider } from 'firebase/auth';
import { firestore as db, auth } from './firebase'; 

const ApplicationPage = () => {
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider)
      .catch((error) => {
        console.error("Error during Google sign-in:", error);
      });
  }

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        const user = result.user;
        if (user && user.email.endsWith(".edu")) {
          // Optionally, proceed with form display logic or other tasks
        } else if (user) {
          alert("Please use a .edu email address!");
          auth.signOut();
        }
      })
      .catch((error) => {
        console.error("Error after Google sign-in redirect:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const answers = {
        name: event.target.name.value,
        email: event.target.email.value,
        // ... (add other form fields as required)
    };

    submitApplication(answers);
  }

  const submitApplication = (answers) => {
    const user = auth.currentUser;

    if (user) {
        db.collection("applications").add({
            userId: user.uid,
            email: user.email,
            ...answers
        }).then(() => {
            alert("Application submitted!");
        }).catch((error) => {
            console.error("Error submitting application: ", error);
        });
    } else {
        alert("Please sign in first before submitting!");
    }
  }

  return (
    <div className="application-container">
      <h2>Application for HK Future Leaders Organization</h2>
      
      {/* Google Sign-in Button */}
      <button onClick={signInWithGoogle}>Sign in with Google</button>

      <form className="application-form" onSubmit={handleSubmit}>
        <label>
          Full Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email Address:
          <input type="email" name="email" required />
        </label>
        <input type="submit" value="Submit Application" />
      </form>
    </div>
  );
};

export default ApplicationPage;
