import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthenticationHandler from './components/AuthenticationHandler';
import HomePage from './components/HomePage';
import CustomTerminal from './components/CustomTerminal.tsx';
import SignIn from './components/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/apply" element={<AuthenticationHandler />} />
        <Route path="/terminal" element={<CustomTerminal />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
