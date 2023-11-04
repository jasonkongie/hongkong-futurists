// UserProfile.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from './AuthContext';
import { firestore } from './firebase';
import './UserProfile.css';

const UserProfile = () => {
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editIntroduction, setEditIntroduction] = useState('');
  const [editResume, setEditResume] = useState('');
  const [editLinkedIn, setEditLinkedIn] = useState('');
  const [editBirthday, setEditBirthday] = useState('');
  const [editInterests, setEditInterests] = useState('');
  const [editPersonalityType, setEditPersonalityType] = useState('');
  const [editPath, setEditPath] = useState('');


  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    // Here you would handle the file upload process to Google Drive or another storage service.
    // This is a placeholder function to be replaced with your actual upload logic.
    console.log('File selected for upload:', file.name);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const docRef = doc(firestore, 'users', userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserProfile(data);
        setEditName(data.name);
        setEditIntroduction(data.introduction || '');
        setEditResume(data.resume || '');
        setEditLinkedIn(data.linkedIn || '');
        setEditBirthday(data.birthday || '');
        setEditInterests(data.interests || '');
        setEditPersonalityType(data.personalityType || '');
        setEditPath(data.path || '');
      } else {
        console.log('No such profile!');
      }
    };

    fetchUserProfile();
  }, [userId]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
    }
  }, [currentUser, navigate]);

  const handleUpdateProfile = async () => {
    const userRef = doc(firestore, 'users', userId);
    await updateDoc(userRef, {
      name: editName,
      introduction: editIntroduction,
      resume: editResume,
      linkedIn: editLinkedIn,
      birthday: editBirthday,
      interests: editInterests,
      personalityType: editPersonalityType,
      path: editPath,
    });
    setUserProfile({
      ...userProfile,
      name: editName,
      introduction: editIntroduction,
      resume: editResume,
      linkedIn: editLinkedIn,
      birthday: editBirthday,
      interests: editInterests,
      personalityType: editPersonalityType,
      path: editPath,
    });
    setEditMode(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (!userProfile) {
    return <div>Loading...</div>;
  }

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
          {currentUser && currentUser.uid === userId && (
            <button onClick={toggleEditMode} className="edit-profile-button">
              {editMode ? 'View Profile' : 'Edit Profile'}
            </button>
          )}
          {!editMode ? (
            <>
              {/* Profile view mode */}
              <h2>Name: {userProfile.name}</h2>
              <p>Introduction: {userProfile.introduction}</p>
              <p>LinkedIn: {userProfile.linkedIn}</p>
              <p>Interests: {userProfile.interests}</p>
              <p>Birthday: {userProfile.birthday}</p>
              <p>Personality Type: {userProfile.personalityType}</p>
              <p>Resume: {userProfile.resume}</p>
              <p>College: {userProfile.college}</p>
              {/* ... other profile fields ... */}
            </>
          ) : (
            <>
              {/* Profile edit mode */}
              <div className="profile-editing">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Full Name"
                />
                <textarea
                  value={editIntroduction}
                  onChange={(e) => setEditIntroduction(e.target.value)}
                  placeholder="Introduction"
                />
                {/* ... other input fields for editing ... */}

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
              <input
                type="text"
                className="profile-editing__input"
                value={editPath}
                onChange={(e) => setEditPath(e.target.value)}
                placeholder="Custom Profile Path"
              />
              <input
                type="file"
                className="profile-editing__input"
                onChange={handleResumeUpload}
                placeholder="Upload Resume"
              />
                <button onClick={handleUpdateProfile} className="save-changes-button">
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
        <div className="widgets">
          {/* Widgets content here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
