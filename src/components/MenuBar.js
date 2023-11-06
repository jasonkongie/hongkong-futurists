import React from "react";
import { Link } from "react-router-dom";
import "./MenuBar.css";

const MenuBar = () => {
  return (
    <div className="menu-bar">
      <Link to="/" className="menu-item home-link">Home</Link>
      <Link to="/about-us" className="menu-item">About Us</Link>
      <Link to="/directory" className="menu-item">Directory</Link>
      <Link to="/contact-us" className="menu-item">Contact Us</Link> 
      {/* still in the works.  */}
    </div>
  );
};

export default MenuBar;
