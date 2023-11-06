import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; // Your Firebase auth import
import RecruiterUtils from './RecruiterUtils'; // Your RecruiterUtils import

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the user is an admin
  useEffect(() => {
    auth.currentUser.getIdTokenResult()
      .then((idTokenResult) => {
        // Confirm the user is an Admin.
        if (!!idTokenResult.claims.admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          setError('You must be an admin to use this panel.');
        }
      })
      .catch((error) => {
        setError('Error checking admin status: ' + error.message);
      });
  }, []);

  const handleGenerateToken = async () => {
    try {
      // This function should be replaced with a call to your server or cloud function
      const generatedToken = await RecruiterUtils.generateSignupToken(email);
      setToken(generatedToken);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isAdmin) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter recruiter's email"
      />
      <button onClick={handleGenerateToken}>Generate Token</button>
      {token && <div><strong>Generated Token:</strong> {token}</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default AdminPanel;
