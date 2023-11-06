// UserProfile.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { AuthContext } from './AuthContext';
import { auth, firestore } from './firebase';
import './UserProfile.css';
import { TextInput } from './form/textInput'; // Adjust the path as necessary
import MenuBar from './MenuBar'; // Import the MenuBar component


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

  // const handleUpdateProfile = async () => {
  //   if (editPath.trim() === '') {
  //     alert('Please enter a custom path.');
  //     return;
  //   }
  
  //   // Only perform the uniqueness check if the path has changed
  //   if (editPath !== userProfile.path) {
  //     const isUnique = await isPathUnique(editPath);
  //     if (!isUnique) {
  //       alert('This path is already taken. Please choose another one.');
  //       return;
  //     }
  //   }
  
  //   const userRef = doc(firestore, 'users', userId);
  //   try {
  //     await updateDoc(userRef, {
  //       name: editName,
  //       introduction: editIntroduction,
  //       resume: editResume,
  //       linkedIn: editLinkedIn,
  //       birthday: editBirthday,
  //       interests: editInterests,
  //       personalityType: editPersonalityType,
  //       path: editPath,
  //     });
  
  //     // If the path has changed, update it in the 'paths' collection
  //     if (editPath !== userProfile.path) {
  //       const newPathRef = doc(firestore, 'paths', editPath);
  //       await setDoc(newPathRef, { userId: userId });
  
  //       // If you want to remove the old path, you can do so here
  //       // const oldPathRef = doc(firestore, 'paths', userProfile.path);
  //       // await deleteDoc(oldPathRef);
  //     }
  
  //     setUserProfile({
  //       ...userProfile,
  //       name: editName,
  //       introduction: editIntroduction,
  //       resume: editResume,
  //       linkedIn: editLinkedIn,
  //       birthday: editBirthday,
  //       interests: editInterests,
  //       personalityType: editPersonalityType,
  //       path: editPath,
  //     });
  
  //     alert('Your profile has been updated!');
  //     setEditMode(false);
  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //     alert('There was an error updating your profile. Please try again.');
  //   }
  // };
  const handleUpdateProfile = async () => {
    if (editPath.trim() === '') {
      alert('Please enter a custom path.');
      return;
    }
  
    // Only perform the uniqueness check if the path has changed
    if (editPath !== userProfile.path) {
      const isUnique = await isPathUnique(editPath);
      if (!isUnique) {
        alert('This path is already taken. Please choose another one.');
        return;
      }
    }
  
    const userRef = doc(firestore, 'users', userId);
    try {
      await updateDoc(userRef, {
        name: editName,
        name_lowercase: editName.toLowerCase(), // Update the lowercase name
        introduction: editIntroduction,
        resume: editResume,
        linkedIn: editLinkedIn,
        birthday: editBirthday,
        interests: editInterests,
        personalityType: editPersonalityType,
        path: editPath,
      });
  
      // If the path has changed, update it in the 'paths' collection
      if (editPath !== userProfile.path) {
        const newPathRef = doc(firestore, 'paths', editPath);
        await setDoc(newPathRef, { userId: userId });
  
        // If you want to remove the old path, you can do so here
        // const oldPathRef = doc(firestore, 'paths', userProfile.path);
        // await deleteDoc(oldPathRef);
      }
  
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
  
      alert('Your profile has been updated!');
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
      <MenuBar /> {/* Include the MenuBar component */}
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
            <div className="profile-viewing">
              <TextInput
                property1="input-regular"
                value={userProfile.name}
                disabled={true}
                placeholder="Full Name"
              />
              <TextInput
                property1="input-regular"
                value={userProfile.introduction}
                disabled={true}
                placeholder="Introduction"
                multiline
              />
              <TextInput
                property1="input-regular"
                value={userProfile.linkedIn}
                disabled={true}
                placeholder="LinkedIn Profile"
              />
              <TextInput
                property1="input-regular"
                value={userProfile.interests}
                disabled={true}
                placeholder="Interests/Hobbies"
              />
              <TextInput
                property1="input-regular"
                value={userProfile.birthday}
                disabled={true}
                placeholder="Birthday"
                type="date"
              />
              <TextInput
                property1="input-regular"
                value={userProfile.personalityType}
                disabled={true}
                placeholder="Personality Type (e.g., INTP)"
              />
              <TextInput
                property1="input-regular"
                value={userProfile.resume}
                disabled={true}
                placeholder="Resume"
                type="file"
              />
              <TextInput
                property1="input-regular"
                value={userProfile.path}
                disabled={true}
                placeholder="Custom Profile Path"
              />
            </div>
          ) : (
            <div className="profile-editing">
              <TextInput
                property1="input-regular"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Full Name"
              />
              <TextInput
                property1="input-regular"
                value={editIntroduction}
                onChange={(e) => setEditIntroduction(e.target.value)}
                placeholder="Introduction"
                multiline
              />
              <TextInput
                property1="input-regular"
                value={editLinkedIn}
                onChange={(e) => setEditLinkedIn(e.target.value)}
                placeholder="LinkedIn Profile"
              />
              <TextInput
                property1="input-regular"
                value={editInterests}
                onChange={(e) => setEditInterests(e.target.value)}
                placeholder="Interests/Hobbies"
              />
              <TextInput
                property1="input-regular"
                value={editBirthday}
                onChange={(e) => setEditBirthday(e.target.value)}
                placeholder="Birthday"
                type="date"
              />
              <TextInput
                property1="input-regular"
                value={editPersonalityType}
                onChange={(e) => setEditPersonalityType(e.target.value)}
                placeholder="Personality Type (e.g., INTP)"
              />
              <TextInput
                property1="input-regular"
                onChange={handleResumeUpload}
                placeholder="Upload Resume"
                type="file"
              />
              <TextInput
                property1="input-regular"
                value={editPath}
                onChange={(e) => setEditPath(e.target.value)}
                placeholder="Custom Profile Path"
              />
              <button onClick={handleUpdateProfile} className="save-changes-button">
                Save Changes
              </button>
            </div>
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
