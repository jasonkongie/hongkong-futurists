// UserProfile.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth, firestore } from './firebase';
import './UserProfile.css';

const UserProfile = () => {
  const { userId, customPath } = useParams();
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

  // Function to check if the path is unique
  const isPathUnique = async (path) => {
    const pathRef = doc(firestore, 'paths', path);
    const docSnap = await getDoc(pathRef);
    return !docSnap.exists();
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    console.log('File selected for upload:', file.name);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      let actualUserId = userId;
  
      if (customPath) {
        const pathRef = doc(firestore, 'paths', customPath);
        const pathSnap = await getDoc(pathRef);
        if (pathSnap.exists()) {
          actualUserId = pathSnap.data().userId;
        } else {
          console.log('No such custom path!');
          return;
        }
      }
  
      const userRef = doc(firestore, 'users', actualUserId);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        const data = userSnap.data();
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
        console.log('No such user!');
      }
    };
  
    fetchUserProfile();
  }, [userId, customPath]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/signin');
    }
  }, [currentUser, navigate]);

  const handleUpdateProfile = async () => {
    if (editPath.trim() === '') {
      alert('Please enter a custom path.');
      return;
    }
  
    const isUnique = await isPathUnique(editPath);
    if (!isUnique) {
      alert('This path is already taken. Please choose another one.');
      return;
    }
  
    const userRef = doc(firestore, 'users', userId);
    try {
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
  
      const pathRef = doc(firestore, 'paths', editPath);
      await setDoc(pathRef, { userId: userId });
  
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
  
      alert('Your profile and custom path have been updated!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('There was an error updating your profile. Please try again.');
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Sign out function
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error signing out. Please try again.');
    }
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
            <>
              <button onClick={toggleEditMode} className="edit-profile-button">
              {editMode ? 'View Profile' : 'Edit Profile'}
            </button>

            <button onClick={handleSignOut} className="sign-out-button">
              Sign Out
            </button>          
            </>

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
                  type="file"
                  className="profile-editing__input"
                  onChange={handleResumeUpload}
                  placeholder="Upload Resume"
                />
                <input
                  type="text"
                  value={editPath}
                  onChange={(e) => setEditPath(e.target.value)}
                  placeholder="Custom Profile Path"
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
