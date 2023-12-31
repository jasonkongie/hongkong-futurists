// MenuBar.js
import React, { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Import the AuthContext
import { Link } from 'react-router-dom'; // Assuming you are using react-router for navigation
import "./MenuBar.css";
import SignIn from './SignIn';

const MenuBar = () => {
  const { currentUser } = useContext(AuthContext); // Use the currentUser from AuthContext

  return (
    <div className="menu-bar">
      <Link to="/" className="home-link">Home</Link>
      <Link to="/about-us" className="menu-item">About Us</Link>
      <Link to="/directory" className="menu-item">Directory</Link>

      {/* Conditional rendering based on currentUser */}
      {currentUser ? (
        <Link to="/terminal" className="menu-item">Apply</Link>
      ) : (
        <Link to="/FAQ" className="menu-item">FAQ</Link>
      )}

      <div className="profile-login-container">
        {currentUser ? (
          <Link to={`/profile/${currentUser.uid}`} className="menu-item">Profile</Link>
        ) : (
          <SignIn signIn={false} /> 
        )}
      </div>
    </div>
  );
};

export default MenuBar;
