import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from './firebase'; // Import your firebase configurations
import './Directory.css'; // CSS file for styling

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(firestore, 'users'));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map(doc => doc.data());
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchTerm) {
      const q = query(collection(firestore, 'users'), where('name', '>=', searchTerm));
      const querySnapshot = await getDocs(q);
      const filteredUsers = querySnapshot.docs.map(doc => doc.data());
      setUsers(filteredUsers);
    }
  };

  return (
    <div className="directory-container">
      <h1>User Directory</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.email} - {user.college}</li>
        ))}
      </ul>
    </div>
  );
};

export default Directory;
