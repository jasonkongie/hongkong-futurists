import React from 'react';
import { OpenAI } from 'openai';

const openaiInstance = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

type Message = {
    role: 'user' | 'assistant';
    content: string;
};

export const ask = async (userMessage: string, conversationHistory: Message[] = []) => {

    const conversationHistoryToUse = [
        ...conversationHistory,
        { role: 'user', content: userMessage }
    ];

    try {
        let gptResponse;
        
        if (openaiInstance.chat) {  // Using the hypothetical .chat method
            gptResponse = await openaiInstance.chat({
                model: "text-davinci-002",
                messages: conversationHistoryToUse
            });
        } else {
            throw new Error("Unsupported OpenAI SDK version. No recognized method available.");
        }

        const responseMessage = gptResponse.data.choices[0].message.content;
        return responseMessage;
    } catch (error) {
        console.error("There was an error communicating with OpenAI:", error);
        return "Sorry, I encountered an error.";
    }
}


const ChatGPT: React.FC = () => {
    const [message, setMessage] = React.useState("");
    const [response, setResponse] = React.useState("");

    const handleSendMessage = async () => {
        const gptResponse = await ask(message);
        setResponse(gptResponse);
    };

    return (
        <div>
            <input 
                type="text" 
                value={message} 
                onChange={e => setMessage(e.target.value)} 
                placeholder="Ask me something" 
            />
            <button onClick={handleSendMessage}>Send</button>
            <p>{response}</p>
        </div>
    );
}

export default ChatGPT;
