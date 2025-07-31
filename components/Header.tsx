
import React from 'react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  centerTitle?: boolean;
}

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ title, onBack, centerTitle = true }) => {
  return (
    <header className="p-4 flex items-center bg-gray-50 sticky top-0 z-10">
      {onBack && (
        <button onClick={onBack} className="p-2 -ml-2 mr-2">
          <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
        </button>
      )}
      <h1 className={`text-xl font-semibold text-gray-800 w-full ${onBack && centerTitle ? 'text-center -ml-10' : 'text-left'}`}>{title}</h1>
    </header>
  );
};

export default Header;
