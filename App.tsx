
import React, { useState, useCallback } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SetupScreen from './components/SetupScreen';
import ReviewScreen from './components/ReviewScreen';
import SettingsScreen from './components/SettingsScreen';
import HomeScreen from './components/HomeScreen';
import { type HouseholdData } from './types';
import { initialHouseholdData } from './constants';

type Screen = 'home' | 'welcome' | 'setup' | 'review' | 'settings' | 'belanja' | 'transaksi' | 'promo' | 'account';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [householdData, setHouseholdData] = useState<HouseholdData>(initialHouseholdData);

  const handleSetupComplete = useCallback((data: HouseholdData) => {
    setHouseholdData(data);
    setScreen('review');
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setScreen('setup')} />;
      case 'setup':
        return <SetupScreen onNext={handleSetupComplete} onBack={() => setScreen('welcome')} />;
      case 'review':
        return <ReviewScreen data={householdData} onConfirm={() => setScreen('home')} onBack={() => setScreen('setup')} />;
      case 'settings':
        return <SettingsScreen onBack={() => setScreen('home')} />;
      case 'home':
        return <HomeScreen onBannerClick={() => setScreen('welcome')} onNavigate={(newScreen) => setScreen(newScreen)} />;
      default:
        return <HomeScreen onBannerClick={() => setScreen('welcome')} onNavigate={(newScreen) => setScreen(newScreen)} />;
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-sm bg-white shadow-lg min-h-screen sm:min-h-[900px] sm:max-h-[1000px] overflow-hidden">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
