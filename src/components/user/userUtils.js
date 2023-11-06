import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from './firebase';

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
}

export default UserUtils;
