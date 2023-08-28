import React, { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import ApplicationPage from './ApplicationPage';
import Typed from 'typed.js';
// import './LoadingPage.css';
import "./AuthenticationHandler.css"

function AuthenticationHandler() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const el = useRef(null);

  const handleApplyClick = () => {
    setShowApplication(true);
  }

  useEffect(() => {
    // Initiate the typing effect
    const typedOptions = {
      strings: ['Most exclusive Hong Kong business league'],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed(el.current, typedOptions);

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => {
      typed.destroy();
      unsubscribe();
    };
  }, []);

  if (showApplication) {
    return <ApplicationPage />;
  }

  return (
    <div className="loading-container">
      <div className="loading-element">
        <span ref={el}></span>
      </div>
      <button onClick={handleApplyClick}>Apply</button>
    </div>
  );
}

export default AuthenticationHandler;
