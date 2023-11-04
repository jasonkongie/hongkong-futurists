import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import AuthenticationHandler from './components/AuthenticationHandler';
import CustomTerminal from './components/CustomTerminal.tsx';
import ProfileCreation from './components/ProfileCreation'; // Import the new component
import Directory from './components/Directory'; // Import the Directory component
import UserProfile from './components/UserProfile';
import { AuthProvider } from './components/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/apply" element={<AuthenticationHandler />} />
          <Route path="/terminal" element={<CustomTerminal />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile-creation" element={<ProfileCreation />} /> {/* Add this line */}
          <Route path="/directory" element={<Directory />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/:customPath" element={<UserProfile />} />
          <Route path="/profile/:userId" element={<UserProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
