import React from 'react';
import Navbar from '../components/Navbar';
import ChatPage from '../pages/ChatPage';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <div className="flex-grow">
        <ChatPage />
      </div>
    </div>
  );
}

export default HomePage;
