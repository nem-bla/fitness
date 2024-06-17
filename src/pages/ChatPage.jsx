import React from 'react';
import Chat from '../components/Chat';

const ChatPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-darker"> {/* Adjusted padding top */}
      <Chat />
    </div>
  );
}

export default ChatPage;
