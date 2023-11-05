import React from 'react';
import MenuBar from './MenuBar'; // Ensure this import path is correct
import backgroundImage from '../assets/background.png'; // Import the background image
import LoadingPage from './LoadingPage';
import './HomePage.css'; // Ensure this import path is correct

function HomePage() {
  return (
    <div className="homepage" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <MenuBar />
      <LoadingPage strings={['Welcome to Hong Kong Futurists']} />
    </div>
  );
}

export default HomePage;
