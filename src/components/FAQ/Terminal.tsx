import './terminal.css';
import React, { ForwardedRef, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { TerminalProps } from "./types";

export const Terminal = forwardRef(
  (props: TerminalProps, ref: ForwardedRef<HTMLDivElement>) => {
    const {
      history = [],
      promptLabel = '>',
      commands = {},
    } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInputValue] = useState<string>('');

    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    const focusInput = useCallback(() => {
      inputRef.current?.focus();
    }, []);

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
      },
      []
    );

    const handleInputKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          const commandToExecute = commands?.answer;
          if (commandToExecute) {
            commandToExecute(input);
          }
          setInputValue('');
        }
      },
      [commands, input]
    );

    return (
      <div className="terminal" ref={ref} onClick={focusInput}>
        {history.map((line, index) => (
          <div className="terminal__line" key={`terminal-line-${index}-${line}`}>
            {line}
          </div>
        ))}
        <div className="terminal__prompt">
          <div className="terminal__prompt__label">{promptLabel}</div>
          <div className="terminal__prompt__input">
            <input
              type="text"
              value={input}
              onKeyDown={handleInputKeyDown}
              onChange={handleInputChange}
              ref={inputRef}
            />
          </div>
        </div>
      </div>
    );
  }
);
