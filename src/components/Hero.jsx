import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="flex items-start justify-center min-h-screen pt-20 bg-gray-100">
      <div className="bg-blue-100 p-8 rounded-lg shadow-md max-w-md w-full">
        <section className="py-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">For Developers</h2>
            <p className="mt-2 mb-6 text-lg">
              Chat with Fitness AI and begin your fitness journey!
            </p>
            <Link
              to="/chat"
              className="inline-block bg-black text-white rounded-lg px-6 py-3 hover:bg-gray-700"
            >
              Start Chat
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
