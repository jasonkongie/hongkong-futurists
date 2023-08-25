#!/bin/bash

# setup.sh

# Create directory structure
echo "Creating directory structure..."
mkdir -p src/components

# Firebase setup
echo "Setting up Firebase configuration..."
cat > src/firebase.js <<EOL
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    // Your firebase config object
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
EOL

# UserProfile setup
echo "Setting up UserProfile component..."
cat > src/components/UserProfile.js <<EOL
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState({ name: '', bio: '' });

    useEffect(() => {
        const fetchProfile = async () => {
            const userProfile = await getDoc(doc(db, 'users', auth.currentUser.uid));
            if (userProfile.exists()) {
                setProfileData(userProfile.data());
            }
        };
        fetchProfile();
    }, []);

    const saveProfile = async () => {
        await setDoc(doc(db, 'users', auth.currentUser.uid), profileData);
        alert('Profile saved!');
    };

    return (
        <div>
            <input 
                value={profileData.name} 
                onChange={e => setProfileData({ ...profileData, name: e.target.value })}
                placeholder="Name"
            />
            <textarea 
                value={profileData.bio} 
                onChange={e => setProfileData({ ...profileData, bio: e.target.value })}
                placeholder="Bio"
            />
            <button onClick={saveProfile}>Save</button>
        </div>
    );
}

export default UserProfile;
EOL

echo "Setup completed!"
