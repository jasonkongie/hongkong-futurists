import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import colleges from './colleges.json'; // Make sure the path is correct
import './ProfileCreation.css'; // CSS file for styling

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ProfileCreation = () => {
  const query = useQuery();
  const email = query.get('email');
  const domain = email.split('@')[1];
  const collegeName = colleges[domain] || 'Unknown Institution';

  // State to hold and update the name
  const [name, setName] = useState(query.get('name') || '');

  // Handler for name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="profile-creation">
      <h1>Create Your Profile</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
        />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} placeholder="Email" readOnly />
        <label htmlFor="college">College:</label>
        <input type="text" id="college" value={collegeName} placeholder="College" readOnly />
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileCreation;
