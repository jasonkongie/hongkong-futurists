import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../src/firebase';

function UserProfile() {
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
        try {
            await setDoc(doc(db, 'users', auth.currentUser.uid), profileData, { merge: true });
            alert('Profile saved!');
        } catch (error) {
            console.error("Error saving profile: ", error);
        }
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
