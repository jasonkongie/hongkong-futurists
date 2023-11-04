// UserProfile.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from './AuthContext'; // Import the AuthContext
import { firestore } from './firebase';
import './UserProfile.css'; // Assuming the CSS from the template is saved in UserProfile.css

const UserProfile = () => {
  const { userId } = useParams(); // Get userId from URL
  const { currentUser } = useContext(AuthContext); // Use AuthContext to get the current user
  const navigate = useNavigate(); // Hook to navigate to different routes
  const [userProfile, setUserProfile] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [editName, setEditName] = useState('');
  const [editIntroduction, setEditIntroduction] = useState('');
  const [editResume, setEditResume] = useState('');
  const [editLinkedIn, setEditLinkedIn] = useState('');
  const [editBirthday, setEditBirthday] = useState('');
  const [editInterests, setEditInterests] = useState('');
  const [editPersonalityType, setEditPersonalityType] = useState('');

  // Fetch user profile from Firestore
  useEffect(() => {
    const fetchUserProfile = async () => {
      const docRef = doc(firestore, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserProfile(docSnap.data());
        setEditName(docSnap.data().name);
        setEditIntroduction(docSnap.data().introduction || '');
        // Set additional fields if they exist
        setEditResume(docSnap.data().resume || '');
        setEditLinkedIn(docSnap.data().linkedIn || '');
        setEditBirthday(docSnap.data().birthday || '');
        setEditInterests(docSnap.data().interests || '');
        setEditPersonalityType(docSnap.data().personalityType || '');
      } else {
        // Handle case where user profile does not exist
        console.log('No such profile!');
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Check if the logged-in user is viewing their own profile
  useEffect(() => {
    if (currentUser && currentUser.uid === userId) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  }, [currentUser, userId]);

  // Update profile information
  const handleUpdateProfile = async () => {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      name: editName,
      introduction: editIntroduction,
      // Update additional fields
      resume: editResume,
      linkedIn: editLinkedIn,
      birthday: editBirthday,
      interests: editInterests,
      personalityType: editPersonalityType,
    });
    setUserProfile({
      ...userProfile,
      name: editName,
      introduction: editIntroduction,
      // Update additional fields
      resume: editResume,
      linkedIn: editLinkedIn,
      birthday: editBirthday,
      interests: editInterests,
      personalityType: editPersonalityType,
    });
  };

  // Redirect to sign-in page if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
    }
  }, [currentUser, navigate]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  // Function to extract college from email
  const getCollegeAffiliation = (email) => {
    // This is a placeholder function. You would replace this with your actual logic
    // to determine the college based on the .edu email provided.
    return email.split('@')[1];
  };

  return (
    <div className="profile-container">
      <div className="header">
        {/* Header content here */}
      </div>
      <div className="body__main">
        <div className="sidebar">
          {/* Sidebar content here */}
        </div>
        <div className="feed">
          {isEditable ? (
            <div className="profile-editing">
              <input
                type="text"
                className="profile-editing__input"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Full Name"
              />
              <textarea
                className="profile-editing__textarea"
                value={editIntroduction}
                onChange={(e) => setEditIntroduction(e.target.value)}
                placeholder="Introduction"
              />
              {/* Additional fields for editing */}
              <input
                type="text"
                className="profile-editing__input"
                value={editResume}
                onChange={(e) => setEditResume(e.target.value)}
                placeholder="Upload Resume"
              />
              <input
                type="text"
                className="profile-editing__input"
                value={editLinkedIn}
                onChange={(e) => setEditLinkedIn(e.target.value)}
                placeholder="LinkedIn Profile"
              />
              <input
                type="date"
                className="profile-editing__input"
                value={editBirthday}
                onChange={(e) => setEditBirthday(e.target.value)}
                placeholder="Birthday"
              />
              <input
                type="text"
                className="profile-editing__input"
                value={editInterests}
                onChange={(e) => setEditInterests(e.target.value)}
                placeholder="Interests/Hobbies"
              />
              <input
                type="text"
                className="profile-editing__input"
                value={editPersonalityType}
                onChange={(e) => setEditPersonalityType(e.target.value)}
                placeholder="Personality Type (e.g., INTP)"
              />
              <button className="profile-editing__button" onClick={handleUpdateProfile}>
                Update Profile
              </button>
            </div>
          ) : (
            <>
              <h2>{userProfile.name}</h2>
              <p>{userProfile.introduction}</p>
              {/* Display additional fields */}
              <p>Resume: {userProfile.resume}</p>
              <p>LinkedIn: {userProfile.linkedIn}</p>
              <p>Birthday: {userProfile.birthday}</p>
              <p>Interests: {userProfile.interests}</p>
              <p>Personality Type: {userProfile.personalityType}</p>
              {/* Display college affiliation */}
              <p>College: {getCollegeAffiliation(userProfile.email)}</p>
            </>
          )}
          {/* Feed content here */}
        </div>
        <div className="widgets">
          {/* Widgets content here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
