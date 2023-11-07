import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase'; // Adjust this import path if necessary

class UserUtils {
  static async getCurrentUser() {
    return auth.currentUser;
  }

  static async fetchUserProfile(userId) {
    const userRef = doc(firestore, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error('User profile does not exist.');
    }
  }

  // Method to check if user is logged in
  static isUserLoggedIn() {
    return auth.currentUser != null;
  }
}

export default UserUtils;
