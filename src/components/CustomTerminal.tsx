import React, { useEffect, useMemo, useState } from 'react';
import { Terminal } from "./Terminal/Terminal.tsx";
import { useTerminal } from "./Terminal/hooks.tsx";

function CustomTerminal() {
  const {
    history,
    pushToHistory,
    setTerminalRef,
    resetTerminal,
  } = useTerminal();

  const questions = [
    "On a scale of 1 to 10, how important is continuous learning in your profession?",
    "How often, on a scale from 1 (never) to 10 (always), do you seek feedback on your work?",
    "Rate your ability to work in a team environment on a scale of 1 (not at all) to 10 (extremely well).",
    "How do you rate the importance of work-life balance in your career? (1 being not important, 10 being extremely important).",
    "On a scale from 1 to 10, how comfortable are you with taking on leadership roles in projects?",
    "What benefits do you envision yourself obtaining from this organization, and in what ways do you see yourself contributing to our mission and objectives?",
    "Can you describe your short-term and long-term career planning? How do you see your role evolving in this industry?",
    "In your opinion, what significant impact or change do you wish to bring to your industry? How do you plan to achieve this during your tenure with us?"
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const isCurrentQuestionIntegerType = currentQuestionIndex < 5;

  useEffect(() => {
    resetTerminal();

    pushToHistory(<>
      <div><strong>Welcome!</strong> to the Hong Kong Futurist's application terminal.</div>
      <div style={{ fontSize: 20 }}>The <span style={{ color: 'yellow' }}><strong>most exclusive</strong></span> student business league in California</div>
      <br />
      <div>You can write: start or alert, or answer the questions as they appear.</div>
    </>);
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
      const currentQuestion = questions[currentQuestionIndex];
      
      if (isCurrentQuestionIntegerType) {
        const intValue = parseInt(input, 10);
        if (intValue >= 1 && intValue <= 10) {
          await pushToHistory(<div>{currentQuestion}<br/>Answer: {intValue}</div>);
          setCurrentQuestionIndex(current => current + 1);
        } else {
          await pushToHistory(<div>Invalid input. Please provide an integer between 1 and 10.</div>);
        }
      } else {
        await pushToHistory(<div>{currentQuestion}<br/>Answer: {input}</div>);
        setCurrentQuestionIndex(current => current + 1);
      }
      
      // Check if all questions are answered
      if (currentQuestionIndex === questions.length - 1) {
        await pushToHistory(<button onClick={() => alert("Application Submitted!")}>Submit Application</button>);
      }
    },
  }), [pushToHistory, isCurrentQuestionIntegerType, currentQuestionIndex, questions]);

  return (
    <div className="CustomTerminal">
      <Terminal
        history={history}
        ref={setTerminalRef}
        promptLabel={currentQuestionIndex < questions.length ? <>{questions[currentQuestionIndex]}</> : <>Write something awesome:</>}
        commands={commands}
      />
    </div>
  );
}

export default CustomTerminal;
