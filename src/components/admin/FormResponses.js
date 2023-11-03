import React, { useEffect } from 'react';
import axios from 'axios';
import { firestore } from './firebase'; // Adjust the import path as necessary
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

const FormResponses = ({ formId }) => {
  const fetchAndStoreResponses = async () => {
    try {
      const response = await axios.get(`https://api.typeform.com/forms/${formId}/responses`, {
        headers: {
          Authorization: 'Bearer A3ekd3xyfHctZkFjmhag25UR5tJPCgmekKQaJYPLPSf2'
        },
        params: {
          page_size: 1000, // Fetch up to 1000 responses at once
          completed: true // Only fetch completed responses
        }
      });

      const responses = response.data.items;
      responses.forEach(async (response) => {
        const responseDocRef = doc(firestore, 'responses', response.response_id);
        const docSnap = await getDoc(responseDocRef);
        
        // Only set if the response is new
        if (!docSnap.exists()) {
          await setDoc(responseDocRef, response);
        }
      });

    } catch (error) {
      console.error('Error fetching responses:', error);
    }
  };

  useEffect(() => {
    fetchAndStoreResponses();
  }, [formId]); // Rerun if formId changes

  return <div>Responses are being synced with Firestore.</div>;
};

export default FormResponses;
