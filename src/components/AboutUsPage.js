import React from 'react';
import MenuBar from './MenuBar'; // Ensure this path is correct
import LoadingPage from './LoadingPage';
import backgroundImage from '../assets/background.png'; // Import the background image
import './AboutUsPage.css'; // Ensure this path is correct

function AboutUsPage() {
  return (
    <div className="about-us-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <MenuBar />
      <div className="content">
        <LoadingPage strings={["Welcome to The Hong Kong Futurists, a network dedicated to uniting Hong Kong's future leaders and professionals with roots in California. Our goal is straightforward: to build a dynamic community that is pivotal in advancing Hong Kong's economic progress."]} loop={false} typeSpeed={2} />
        {/* You can add more content here that describes your organization */}
      </div>
    </div>
  );
}

export default AboutUsPage;
