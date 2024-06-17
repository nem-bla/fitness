import React, { useState, useEffect, useRef } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messageEndRef = useRef(null);

  const newMessage = async (userInput) => {
    const res = await fetch('http://localhost:8000/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: userInput }), // Send as an object
    });

    // Optionally handle the response if needed
    const data = await res.json();
    return data;
  };

  const handleSendMessage = async () => {
    if (userInput.trim() !== '') {
      setMessages([...messages, { user: true, message: userInput }]);

      // Send message to backend
      const response = await newMessage(userInput);

      // Add backend response to messages
      setMessages(prevMessages => [...prevMessages, { user: false, message: response.message }]);

      setUserInput(''); // Clear input field after sending
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-window w-full max-w-4xl h-[calc(65vh)] bg-white rounded-lg shadow-md p-6 mt-0 flex flex-col">
      <ul className="message-list flex-1 overflow-y-auto list-none pl-0 mb-4">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`message flex items-start mb-4 ${
              message.user ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.user ? (
              <div className="user-message flex items-center py-3 px-4 rounded-lg bg-gray-200 text-gray-800">
                {message.message}
              </div>
            ) : (
              <div className="reply-message flex items-center py-3 px-4 rounded-lg bg-blue-200 text-blue-800">
                {message.message}
              </div>
            )}
          </li>
        ))}
        <div ref={messageEndRef}></div>
      </ul>
      <div className="input-container flex items-center"> 
        <input
          type="text"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-3 px-4 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
