import React, { useState, useEffect } from 'react';
import './ApplicationPage.css';
import { auth, firestore, GoogleAuthProvider } from './firebase';  // Import from your firebase.js
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query, addDoc, serverTimestamp } from 'firebase/firestore';
import { getRedirectResult } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';



function ApplicationPage() {
  const applicationsRef = collection(firestore, 'applications');
  const q = query(applicationsRef, orderBy('createdAt'));

  const [applications] = useCollectionData(q, { idField: 'id' });
  const [formValue, setFormValue] = useState({ name: '', email: '' });

  const signInWithGoogle = () => {
    signInWithPopup(auth, GoogleAuthProvider).then((result) => {
        // You can handle the result or user details here if needed
    }).catch((error) => {
        console.error("Error during Google sign-in:", error);
    });
}

  useEffect(() => {
    getRedirectResult(auth).then((result) => {
        if (result && result.user) {
            const user = result.user;
            if (user.email.endsWith(".edu")) {
                // ... logic ...
            } else {
                alert("Please use a .edu email address!");
                auth.signOut();
            }
        }
    }).catch((error) => {
        console.error("Error after Google sign-in redirect:", error);
    });
}, []);


  const handleSubmit = (event) => {
    event.preventDefault();
    submitApplication(formValue);
  }

  const submitApplication = async (applicationData) => {
    const user = auth.currentUser;

    if (user) {
      try {
        await addDoc(applicationsRef, {
          userId: user.uid,
          email: user.email,
          ...applicationData,
          createdAt: serverTimestamp()
        });
        alert("Application submitted!");
        setFormValue({ name: '', email: '' });
      } catch (error) {
        console.error("Error submitting application: ", error);
      }
    } else {
      alert("Please sign in first before submitting!");
    }
  }

  return (
    <div className="application-container">
      <h2 className="application-header">Application for HK Future Leaders Organization</h2>
    
      <form className="application-form">
        <input 
          name="name" 
          type="text" 
          className="feedback-input" 
          placeholder="Full Name" 
          value={formValue.name} 
          onChange={e => setFormValue({ ...formValue, name: e.target.value })} 
          required 
        />
        <input 
          name="email" 
          type="email" 
          className="feedback-input" 
          placeholder="Email Address" 
          value={formValue.email} 
          onChange={e => setFormValue({ ...formValue, email: e.target.value })} 
          required 
        />
        <input type="submit" value="Submit Application" className="feedback-submit"/>
      </form>
    </div>
  );
  
}

export default ApplicationPage;
