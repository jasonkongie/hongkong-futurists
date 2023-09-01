import React, { useState } from 'react';
import openai from 'openai';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const ChatGPT = () => {
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleAsk = async () => {
    // Update conversation history with user's question
    setConversationHistory(prevHistory => [...prevHistory, { role: 'user', content: inputValue }]);

    try {
      const gptResponse = await openai.createCompletion({
        model: "text-davinci-002",
        messages: conversationHistory
      });

      const responseMessage = gptResponse.data.choices[0].message.content;

      // Update conversation history with assistant's answer
      setConversationHistory(prevHistory => [...prevHistory, { role: 'assistant', content: responseMessage }]);
    } catch (error) {
      // Handle any errors that arise during the API call
      console.error("There was an error communicating with OpenAI:", error);
    }

    // Clear the input after asking
    setInputValue("");
  };

  return (
    <div>
      <div className="chatHistory">
        {conversationHistory.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <span>{message.role}: </span> {message.content}
          </div>
        ))}
      </div>
      <div className="inputArea">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Ask something..."
        />
        <button onClick={handleAsk}>Ask</button>
      </div>
    </div>
  );
};

export default ChatGPT;
