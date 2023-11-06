import React, { useEffect, useState, useMemo } from 'react';
import { Terminal } from './Terminal/Terminal.tsx';
import { useTerminal } from './Terminal/hooks.tsx';
import { ask } from './ChatGPT.tsx';

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

  useEffect(() => {
    resetTerminal();
    pushToHistory(
      <>
        <div><strong>Welcome!</strong> to the Hong Kong Futurist's A.I terminal.</div>
        <div style={{ fontSize: 20 }}>The <span style={{ color: 'red' }}><strong>most exclusive</strong></span> student business league in California</div>
        <br />
        <div>Type start to begin: </div>
      </>
    );
  }, []);

  const commands = useMemo(() => ({
    'start': async () => {
      await pushToHistory(<div><strong>Starting</strong> the server... <span style={{ color: 'green' }}>Done</span></div>);
    },
    'alert': async () => {
      alert('Hello!');
      await pushToHistory(<div><strong>Alert</strong><span style={{ color: 'orange', marginLeft: 10 }}><strong>Shown in the browser</strong></span></div>);
    },
    'answer': async (input) => {
      const userMessage = input.trim();
      const gptResponse = await ask(userMessage, conversationHistory);

      setConversationHistory([...conversationHistory, { role: 'user', content: userMessage }, { role: 'assistant', content: gptResponse }]);
      
await pushToHistory(
    <div>
        <span className="terminal__user" style={{ marginLeft: 10 }}>You:</span> 
        <strong className="terminal__user">{userMessage}</strong><br />
        <span className="terminal__assistant" style={{ marginLeft: 10 }}>Assistant:</span> 
        <strong className="terminal__assistant">{gptResponse}</strong>
    </div>
    );

    },
  }), [pushToHistory, conversationHistory]);

  return (
    <div className="CustomTerminal">
      <Terminal
        history={history}
        ref={setTerminalRef}
        promptLabel={<>You:  </>}
        commands={commands}
      />
    </div>
  );
}

export default CustomTerminal;
