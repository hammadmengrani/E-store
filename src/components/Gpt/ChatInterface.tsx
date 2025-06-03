'use client';
import { askGemini } from '@/graphql/gpt';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [initialMessageVisible, setInitialMessageVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && input.trim()) {
      e.preventDefault();

      const userMessage: Message = { text: input, sender: 'user' };
      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setInitialMessageVisible(false);
      setIsTyping(true);

      try {
        const geminiResponse = await askGemini(input);
        const aiMessage: Message = { text: geminiResponse, sender: 'ai' };
        setMessages((prev) => [...prev, aiMessage]);
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { text: '❌ Error getting response from Gemini.', sender: 'ai' },
        ]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  return (
    <div className="h-[85vh] flex flex-col justify-between items-center p-4">
      {/* Initial prompt */}
      {initialMessageVisible && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-3xl font-semibold mb-4">How can I help you?</h1>
          <textarea
            className="w-80 p-2 border border-gray-300 rounded-md"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSendMessage}
            placeholder="Type your message..."
          />
        </div>
      )}

      {/* Message thread */}
      {!initialMessageVisible && (
        <div className="flex-1 w-full overflow-y-auto mb-20">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4 px-4`}
            >
              <div
                className={`md:max-w-[80vw] p-3 rounded-lg whitespace-pre-wrap ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'
                }`}
              >
                {message.sender === 'ai' ? (
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                ) : (
                  message.text
                )}
              </div>
            </motion.div>
          ))}

          {/* Typing animation */}
          {isTyping && (
            <motion.div
              className="flex justify-start px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md flex gap-1"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <motion.span
                  className="w-2 h-2 bg-gray-500 rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.span
                  className="w-2 h-2 bg-gray-500 rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.span
                  className="w-2 h-2 bg-gray-500 rounded-full"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      )}

      {/* Bottom input */}
      {!initialMessageVisible && (
        <div className="w-full bottom-0 left-0 p-4 bg-white border-t border-gray-200">
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleSendMessage}
            placeholder="Type your message..."
          />
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
