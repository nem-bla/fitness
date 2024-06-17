import React from 'react';
import ChatPage from '../pages/ChatPage';
import Hero from '../components/Hero';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <div className="flex-grow">
        <Hero />
   
      </div>
    </div>
  );
}

export default HomePage;
