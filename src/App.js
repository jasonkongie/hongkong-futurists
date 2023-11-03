import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import CustomTerminal from './components/CustomTerminal.tsx';
import RedirectComponent  from './components/Redirect/RedirectComponent';
import ProfilePage from './components/ProfilePage';
import SignIn from './components/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/apply" element={<AuthenticationHandler />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/terminal" element={<CustomTerminal />} />
        <Route path="/apply" element={<RedirectComponent targetUrl="https://p4kq9oknrl1.typeform.com/to/LJUtAcbH" />} />
        <Route path="/profile/:profileId" element={<ProfilePage />} />
        <Route path="/signIn" element={<SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;
