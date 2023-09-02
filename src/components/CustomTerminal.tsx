import React, { useEffect, useMemo, useState } from 'react';
import { Terminal } from "./Terminal/Terminal.tsx";
import { useTerminal } from "./Terminal/hooks.tsx";
import { ask } from './ChatGPT.tsx';

function CustomTerminal() {
  const {
    history,
    pushToHistory,
    setTerminalRef,
    resetTerminal,
  } = useTerminal();

  const [conversationHistory, setConversationHistory] = useState([{ role: 'assistant', content: 'Hello. What is your name?' }]);
  
  useEffect(() => {
    resetTerminal();
    pushToHistory(<div><strong>Hello. What is your name?</strong></div>);
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
      const userMessage = input;
      const gptResponse = await ask(userMessage, conversationHistory);
      await pushToHistory(<div>{gptResponse}</div>);
      setConversationHistory([...conversationHistory, { role: 'user', content: userMessage }, { role: 'assistant', content: gptResponse }]);
    },
  }), [pushToHistory, conversationHistory]);

  return (
    <div className="CustomTerminal">
      <Terminal
        history={history}
        ref={setTerminalRef}
        promptLabel={conversationHistory.length ? <>{conversationHistory[conversationHistory.length - 1].content}</> : <>Write something awesome:</>}
        commands={commands}
      />
    </div>
  );
}

export default CustomTerminal;
