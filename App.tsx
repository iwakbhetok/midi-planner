
import React, { useState, useCallback, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import SetupScreen from './components/SetupScreen';
import ReviewScreen from './components/ReviewScreen';
import NotificationSettingsScreen from './components/NotificationSettingsScreen';
import SettingsScreen from './components/SettingsScreen';
import HomeScreen from './components/HomeScreen';
import SuccessScreen from './components/SuccessScreen';
import CheckoutScreen from './components/CheckoutScreen';
import { type HouseholdData, type ExtractedProduct } from './types';
import { initialHouseholdData } from './constants';

type Screen = 'home' | 'welcome' | 'setup' | 'review' | 'notificationSettings' | 'success' | 'settings' | 'belanja' | 'transaksi' | 'promo' | 'account';

const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [householdData, setHouseholdData] = useState<HouseholdData>(initialHouseholdData);
  const [products, setProducts] = useState<ExtractedProduct[]>([]);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [submissionIdFromPath, setSubmissionIdFromPath] = useState<string | null>(null);

  useEffect(() => {
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(Boolean);
    // Basic check for a UUID-like ID
    if (pathParts.length === 1 && pathParts[0].length > 20) { 
        setSubmissionIdFromPath(pathParts[0]);
    }
  }, []);


  const handleSetupComplete = useCallback((data: HouseholdData, extractedProducts: ExtractedProduct[]) => {
    setHouseholdData(data);
    setProducts(extractedProducts);
    setScreen('review');
  }, []);

  const handleReviewComplete = useCallback((id: string) => {
    setSubmissionId(id);
    setScreen('notificationSettings');
  }, []);

  const handleSettingsSaved = useCallback((phone: string) => {
    setPhoneNumber(phone);
    setScreen('success');
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <WelcomeScreen onGetStarted={() => setScreen('setup')} />;
      case 'setup':
        return <SetupScreen onNext={handleSetupComplete} onBack={() => setScreen('welcome')} />;
      case 'review':
        return <ReviewScreen data={householdData} products={products} onConfirm={handleReviewComplete} onBack={() => setScreen('setup')} />;
      case 'notificationSettings':
        return <NotificationSettingsScreen submissionId={submissionId} onSave={handleSettingsSaved} onBack={() => setScreen('review')} />;
      case 'success':
        return <SuccessScreen onBackToHome={() => setScreen('home')} submissionId={submissionId} phoneNumber={phoneNumber} />;
      case 'settings':
        return <SettingsScreen onBack={() => setScreen('home')} />;
      case 'home':
        return <HomeScreen onBannerClick={() => setScreen('welcome')} onNavigate={(newScreen) => setScreen(newScreen)} />;
      default:
        return <HomeScreen onBannerClick={() => setScreen('welcome')} onNavigate={(newScreen) => setScreen(newScreen)} />;
    }
  };

  const renderContent = () => {
    if (submissionIdFromPath) {
        return <CheckoutScreen submissionId={submissionIdFromPath} />;
    }
    return renderScreen();
  }

  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-start">
      <div className="w-full max-w-sm bg-white shadow-lg min-h-screen sm:min-h-[900px] sm:max-h-[1000px] overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;
