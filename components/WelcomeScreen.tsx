
import React from 'react';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col h-full justify-between bg-white rounded-lg">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <img src="/assets/images/screen-1.jpg" alt="Grocery Shopping" className="w-full object-cover mb-8" />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Midi Kriing</h1>
          <p className="text-gray-500 mb-8">
            Shop for your daily needs and get them delivered to your doorstep. Fast, easy, and convenient.
          </p>
        </div>
      </div>
      <div className="p-6">
      <button
        onClick={onGetStarted}
        className="w-full bg-[#D52B1E] text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
      >
        Get Started
      </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;