import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../firebase';

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

  // New method to check if the current user is a recruiter
  static async isUserRecruiter(userId) {
    const recruiterRef = doc(firestore, 'recruiters', userId);
    const recruiterSnap = await getDoc(recruiterRef);
    return recruiterSnap.exists(); // Returns true if the user is a recruiter, false otherwise
  }
}

export default UserUtils;
