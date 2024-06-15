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
    <div className="chat-window fixed top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-full max-w-md h-96 bg-white rounded-lg shadow-md p-4 flex flex-col">
      <ul className="message-list flex-1 overflow-y-auto list-none pl-0 mb-4">
        {messages.map((message, index) => (
          <li
            key={index}
            className={`message flex items-start mb-2 ${
              message.user ? 'justify-end' : 'justify-start'
            }`}
          >
            {message.user ? (
              <div className="user-message flex items-center py-2 px-3 rounded-lg bg-gray-100 text-gray-600">
                {message.message}
              </div>
            ) : (
              <div className="reply-message flex items-center py-2 px-3 rounded-lg bg-blue-100 text-blue-600">
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
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-3 py-2 rounded-lg bg-dark text-white hover:bg-blue-600 focus:outline-none"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
