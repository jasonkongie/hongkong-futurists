import { functions } from './firebase'; // Make sure you have a firebase.js file configured with Firebase

const generateAuthLink = functions.httpsCallable('generateAuthLink');

export const requestAuthLink = (email) => {
  return generateAuthLink({ email })
    .then((result) => {
      // The auth link is available in result.data.authLink
      return result.data.authLink;
    })
    .catch((error) => {
      // Handle the error here
      console.error('Error requesting auth link:', error);
      throw error;
    });
};
