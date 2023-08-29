import React, {useEffect, useMemo} from 'react';
import {Terminal} from "./Terminal/Terminal.tsx";
import {useTerminal} from "./Terminal/hooks.tsx";

function CustomTerminal() {
  const {
    history,
    pushToHistory,
    setTerminalRef,
    resetTerminal,
  } = useTerminal();


  useEffect(() => {
    resetTerminal();

    pushToHistory(<>
        <div><strong>Welcome!</strong> to the terminal.</div>
        <div style={{fontSize: 20}}>It contains <span style={{color: 'yellow'}}><strong>HTML</strong></span>. Awesome, right?</div>
        <br/>
        <div>You can write: start or alert , to execute some commands.</div>
      </>
    );
  }, []);

  const commands = useMemo(() => ({
    'start': async () => {
      await pushToHistory(<>
          <div>
            <strong>Starting</strong> the server... <span style={{color: 'green'}}>Done</span>
          </div>
        </>);
    },
    'alert': async () => {
      alert('Hello!');
      await pushToHistory(<>
          <div>
            <strong>Alert</strong>
            <span style={{color: 'orange', marginLeft: 10}}>
              <strong>Shown in the browser</strong>
            </span>
          </div>
        </>);
    },
  }), [pushToHistory]);

  return (
    <div className="CustomTerminal">
      <Terminal
        history={history}
        ref={setTerminalRef}
        promptLabel={<>Write something awesome:</>}
        commands={commands}
      />
    </div>
  );
}

export default CustomTerminal;