import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase';
import { Link } from 'react-router-dom';
import './Directory.css';
import search from '../assets/SearchOutline.png'
import ucBerkeleyLogo from '../assets/UC Berkeley.png';
import ucdLogo from '../assets/UCD.png';
import uclaLogo from '../assets/UCLA.png';
import ucsdLogo from '../assets/UCSD.png';
import uscLogo from '../assets/USC.svg.png';
import defaultLogo from '../assets/UCLA.png'; // Make sure to add a default logo image in your assets
import MenuBar from './MenuBar';

const Directory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(firestore, 'users'));
      const querySnapshot = await getDocs(q);
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchTerm) {
      // Convert the search term to lowercase
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const q = query(
        collection(firestore, 'users'),
        where('name_lowercase', '>=', lowerCaseSearchTerm),
        where('name_lowercase', '<=', lowerCaseSearchTerm + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);
      const filteredUsers = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(filteredUsers);
    }
  };
  

  const getLogo = (college) => {
    switch (college) {
      case 'University of California, Berkeley':
        return ucBerkeleyLogo;
      case 'University of California, Davis':
        return ucdLogo;
      case 'University of California, Los Angeles':
        return uclaLogo;
      case 'University of California, San Diego':
        return ucsdLogo;
      case 'University of Southern California':
        return uscLogo;
      // Add cases for other universities if logos are available
      // ...
      default:
        return defaultLogo; // Use the imported default logo
    }
  };
  
  return (
    <div className="directory-container">
      <MenuBar/>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Find Member.."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">
        <img src= {search} alt="Search" />
        </button>
        </form>
      </div>
      {/* ... other components ... */}
      <div className="user-cards">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <Link to={`/profile/${user.id}`}>
              <img src={getLogo(user.college)} alt={`${user.name}'s college logo`} />
              <div className="user-name">{user.name}</div> {/* Add class for user name */}
              <div className="user-college">{user.college}</div> {/* Add class for user college */}
            </Link>
          </div>
        ))}
      </div>
      {/* ... other components ... */}
    </div>
  );
};

export default Directory;
