#!/bin/bash

# Create ApplicationPage component and its CSS file
echo "Creating ApplicationPage.js..."
cat <<EOL > components/ApplicationPage.js
import React from 'react';

const ApplicationPage = () => {
  return (
    <div className="application-container">
      <h2>Application for HK Future Leaders Organization</h2>
      <form className="application-form">
        <label>
          Full Name:
          <input type="text" name="name" required />
        </label>
        <label>
          Email Address:
          <input type="email" name="email" required />
        </label>
        <label>
          Address in Hong Kong:
          <textarea name="address" required></textarea>
        </label>
        <label>
          Californian Institution:
          <input type="text" name="institution" required />
        </label>
        <label>
          Committee Interest:
          <select name="committee">
            <option value="finance">Finance, Trade & Property Committee</option>
            <option value="tech">Tech & Innovation Committee</option>
            <option value="tourism">Tourism, Entertainment & Professional Services Committee</option>
          </select>
        </label>
        <label>
          Experiences or Qualifications:
          <textarea name="experience" required></textarea>
        </label>
        <label>
          Why do you want to join?
          <textarea name="reason" required></textarea>
        </label>
        <label>
          Accept Membership Fee of $800 HKD or $100 USD:
          <input type="checkbox" name="feeAcceptance" required />
        </label>
        <label>
          I agree to the organization's values and rules:
          <input type="checkbox" name="agreement" required />
        </label>
        <input type="submit" value="Submit Application" />
      </form>
    </div>
  );
};

export default ApplicationPage;
EOL

echo "Creating ApplicationPage.css..."
cat <<EOL > components/ApplicationPage.css
.application-container {
  padding: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.application-form {
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

input[type="text"], input[type="email"], textarea, select {
  padding: 0.5em;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
}
EOL

# Update App.js to include the new Route and Link
echo "Updating App.js..."
cat <<EOL > App.js
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import ApplicationPage from './components/ApplicationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/apply">Apply</Link>
        </nav>
        <Route path="/" exact component={HomePage} />
        <Route path="/apply" component={ApplicationPage} />
      </div>
    </Router>
  );
}

export default App;
EOL

echo "Done! Please make sure to install react-router-dom if you haven't already by running 'npm install react-router-dom'."
