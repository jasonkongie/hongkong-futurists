#!/bin/bash

# Check if react-router-dom is installed
if ! npm list react-router-dom; then
    echo "Installing react-router-dom..."
    npm install react-router-dom
fi

# Create AuthenticationHandler.js in the components directory
cat <<EOL > ./components/AuthenticationHandler.js
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import ApplicationPage from './ApplicationPage';
import SignIn from './SignIn';

function AuthenticationHandler() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated) {
    return <ApplicationPage />;
  } else {
    return <SignIn onAuthenticated={() => setIsAuthenticated(true)} />;
  }
}

export default AuthenticationHandler;
EOL

# Update App.js for routing
cat <<EOL > ./App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthenticationHandler from './components/AuthenticationHandler';
import ApplicationPage from './components/ApplicationPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/applications">
          <ApplicationPage />
        </Route>
        <Route path="/">
          <AuthenticationHandler />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
EOL

echo "Setup complete. Please check your files for the changes."
