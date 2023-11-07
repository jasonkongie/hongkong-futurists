import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Terminal } from './Terminal.tsx';
import { useTerminal } from './hooks.tsx';
import { ask } from './ChatGPT.tsx';
import MenuBar from '../MenuBar.js';
import { firestore } from '../firebase.js'; // Adjust the path to where your Firebase is initialized
import { getDoc, doc, updateDoc, arrayUnion, setDoc, serverTimestamp} from 'firebase/firestore';
import UserUtils from '../user/userUtils.js';
import { AuthContext } from '../AuthContext.js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js'; // Adjust this path to your firebase config file


const initialConversationHistory = [
    { role: 'system', content: 'You are the assistant, acting as an interviewer for the Hong Kong Futurists organization. Your mission is to find the brightest minds from Hong Kong who are studying or have graduated from recognized Californian institutions.' },
    { role: 'system', content: 'The applicants must meet our eligibility criteria: They should be a permanent resident of Hong Kong and they must be studying or be an alumnus of a recognized Californian institution.' },
    { role: 'system', content: 'The conversation should align with our organization\'s core values: 1. Selflessness: Assess if the candidate fosters mutual trust and aims for collective success. 2. Integrity: Evaluate if the candidate maintains a strong ethical and moral compass. 3. Exclusivity: Gauge whether the candidate can appreciate and contribute to our exclusive resources and mission.' },
    { role: 'system', content: 'Our online domain, HKGFuturist.org, serves as a central hub for our members. Each member receives a bespoke email ID (FirstNameLastName@hkgfuturist.org) which underscores our commitment to exclusivity and member security.'},
    { role: 'system', content: 'Hong Kong Futurists is just a name; the interview should not focus on the ideology of Futurism. Instead, focus on assessing the applicant\'s personality traits to ensure they align with our core values.'},
    { role: 'system', content: 'The interview should not just be a questionnaire but an engaging and insightful conversation. Involve some small talk to keep the conversation human-like, and ask questions to assess their suitability for the organization.' },
    { role: 'assistant', content: "Hello. I am the interviewer for the Hong Kong Futurists organization. What is your name?" }
  ];
  
  
function CustomTerminal() {
  const {
    history,
    pushToHistory,
    setTerminalRef,
    resetTerminal,
  } = useTerminal();

  const [conversationHistory, setConversationHistory] = useState(initialConversationHistory);
  const [conversationId, setConversationId] = useState('');
  // const [userName, setUserName] = useState('');
  const { currentUser } = useContext(AuthContext);
  // const [user, setUser] = useState<User | null>(null);
  // const [userName, setUserName] = useState<string>('FAQ:');
  const [userName, setUserName] = useState('FAQ');
  const [user, setUser] = useState(null);



  const generateConversationId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };

  useEffect(() => {
    // Set up the observer
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // currentUser is User | null
      // setUserName(currentUser?.displayName || currentUser?.email || '');
    });

    // Unsubscribe to the observer when component unmounts
    return unsubscribe;
  }, []);


  useEffect(() => {
    resetTerminal();

    //fetch user
    async function fetchCurrentUserProfile() {
      try {
        const currentUser = await UserUtils.getCurrentUser();
        if (currentUser) {
          const userProfile = await UserUtils.fetchUserProfile(currentUser.uid);
          setUserName(userProfile.name); // set the fetched name to state
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }

      fetchCurrentUserProfile();


    //terminal
    const newConversationId = generateConversationId();
    setConversationId(newConversationId); // Ensure this is being called

    if (user) {
      pushToHistory(
        <>
          <div><strong>Welcome!</strong> to the Hong Kong Futurist's A.I interview terminal for exclusive members.</div>
          <div style={{ fontSize: '20px' }}>The <span style={{ color: 'red' }}><strong>most exclusive</strong></span> student business league in California</div>
          <br />
          <div>Type "start" to begin:</div>
        </>
      );
    } else {
      pushToHistory(
        <>
          <div><strong>Welcome!</strong> to the Hong Kong Futurist's A.I terminal.</div>
          <div style={{ fontSize: '20px' }}>The <span style={{ color: 'red' }}><strong>most exclusive</strong></span> student business league in California</div>
          <div>In order to apply as an exclusive member, you must sign up and be logged in.</div>
          <br/>
          <div>You may learn more about us by asking HAL 9000 - from 2001: A Space Odyssey</div>
        </>
      );
    }
  }, [currentUser]);


  // Function to save or update the conversation in Firebase

  const saveConversationToFirebase = async (newHistory, convId) => {
    if (!convId) {
      console.error('Conversation ID is undefined.');
      return;
    }
  
    const conversationRef = doc(firestore, 'conversations', convId);
  
    try {
      // Create a new array for the history without the serverTimestamp
      const updatedHistory = newHistory.map(item => ({
        ...item,
      }));
  
      const docSnapshot = await getDoc(conversationRef);
      if (docSnapshot.exists()) {
        await updateDoc(conversationRef, {
          // Use serverTimestamp here for a top-level field, like 'updatedAt'
          updatedAt: serverTimestamp(),
          history: arrayUnion(...updatedHistory),
        });
        console.log('Conversation updated successfully');
      } else {
        await setDoc(conversationRef, {
          // Use serverTimestamp here for a top-level field, like 'createdAt'
          createdAt: serverTimestamp(),
          history: updatedHistory,
        });
        console.log('Conversation created successfully');
      }
    } catch (error) {
      console.error('Error updating conversation: ', error);
    }
  };
  



  const commands = useMemo(() => ({
    'answer': async (input) => {
      const userMessage = input.trim();
      const gptResponse = await ask(userMessage, conversationHistory);

    //   setConversationHistory([...conversationHistory, { role: 'user', content: userMessage }, { role: 'assistant', content: gptResponse }]);
        const newHistory = [...conversationHistory, { role: 'user', content: userMessage }, { role: 'assistant', content: gptResponse }];
        setConversationHistory(newHistory);

      //save conversation history:
      saveConversationToFirebase(newHistory, conversationId);

      
await pushToHistory(
    <div>
        <span className="terminal__user" style={{ marginLeft: 10 }}>You:</span> 
        <strong className="terminal__user">{userMessage}</strong><br />
        <span className="terminal__assistant" style={{ marginLeft: 10 }}>HAL 9000 :</span> 
        <strong className="terminal__assistant">{gptResponse}</strong>
    </div>
    );

    },
  }), [pushToHistory, conversationHistory, conversationId]);

  return (
    <div className="CustomTerminal">
      <MenuBar/>
      <Terminal
        history={history}
        ref={setTerminalRef}
        promptLabel={<>{userName}: </>}
        commands={commands}
      />
    </div>
  );
}

export default CustomTerminal;