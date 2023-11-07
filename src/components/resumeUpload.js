import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { firestore } from './firebase'; // Adjust the import path as necessary

const ResumeUpload = ({ userId }) => {
  const [resumeUrl, setResumeUrl] = useState('');

  const handleResumeUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log('File selected for upload:', file.name);

    const storage = getStorage();
    const storageRef = ref(storage, `resumes/${userId}/${file.name}`);

    try {
      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
      console.log('Uploaded a blob or file!');

      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log('File available at', downloadURL);

      // Save the download URL to the user's profile in Firestore
      const userRef = doc(firestore, 'users', userId);
      await updateDoc(userRef, {
        resume: downloadURL,
      });

      // Update the local state to display the resume
      setResumeUrl(downloadURL);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <input
        onChange={handleResumeUpload}
        type="file"
        id="resume"
        name="resume"
        accept=".pdf,.doc,.docx"
      />
      {resumeUrl && (
        <iframe src={resumeUrl} title="Resume" width="100%" height="500px"></iframe>
      )}
    </div>
  );
};

export default ResumeUpload;
