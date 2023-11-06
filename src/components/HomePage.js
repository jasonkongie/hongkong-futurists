import React from 'react';
import MenuBar from './MenuBar'; // Ensure this path is correct
import LoadingPage from './LoadingPage';
import backgroundImage from '../assets/background.png'; // Import the background image
import './HomePage.css'; // Ensure this path is correct
import SignIn from './SignIn';

function HomePage() {
  return (
    <div className="homepage" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <MenuBar />
      <div className="content">
        <LoadingPage strings={['Welcome to Hong Kong Futurists']} loop={false} typeSpeed={50} />
        <SignIn />
      </div>
      {/* Include other components or content here */}
    </div>
  );
}

export default HomePage;
