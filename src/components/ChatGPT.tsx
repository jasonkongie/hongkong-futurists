import React, { useState } from 'react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export const ask = async (userMessage: string, conversationHistory: Message[] = []) => {
  const conversationHistoryToUse = [
    ...conversationHistory,
    { role: 'user', content: userMessage },
  ];
  
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // Replace this with the actual GPT-4 chat model identifier
      messages: conversationHistoryToUse,
    });

    const responseMessage = chatCompletion.choices[0].message.content;
    return responseMessage;
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);
      console.error(error.message);
      console.error(error.code);
      console.error(error.type);
    } else {
      console.log(error);
    }
    return 'Sorry, I encountered an error.';
  }
};

const ChatGPT: React.FC = () => {
  const [conversationHistory, setConversationHistory] = useState<Message[]>([]);
  
  const handleCommand = async (command: string) => {
    const response = await ask(command, conversationHistory);
    setConversationHistory([...conversationHistory, { role: 'assistant', content: response }]);
  };
  
  return (
    <div>
      {/* Your JSX UI here */}
    </div>
  );
};

export default ChatGPT;
