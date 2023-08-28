// Import necessary components from Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCNs0yK0cAMQWGk5JO-92GWqnzO4LTugY",
  authDomain: "hongkong-futurists.firebaseapp.com",
  projectId: "hongkong-futurists",
  storageBucket: "hongkong-futurists.appspot.com",
  messagingSenderId: "611854236661",
  appId: "1:611854236661:web:8cffd523eb60c814ddfebc",
  measurementId: "G-7QYBSGQ5Q4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances of Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();

export { auth, firestore, googleAuthProvider as GoogleAuthProvider };
