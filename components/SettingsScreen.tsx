
import React, { useState } from 'react';
import Header from './Header';

interface SettingsScreenProps {
    onBack: () => void;
}

const RadioIcon: React.FC<{ checked: boolean }> = ({ checked }) => (
    <div className={`w-5 h-5 rounded-full border-2 ${checked ? 'border-[#D52B1E]' : 'border-gray-300'} flex items-center justify-center`}>
        {checked && <div className="w-2.5 h-2.5 bg-[#D52B1E] rounded-full"></div>}
    </div>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
    const [frequency, setFrequency] = useState('every_2_weeks');

    const frequencyOptions = [
        { id: 'every_2_weeks', label: 'Every 2 weeks' },
        { id: 'every_month', label: 'Every month' },
        { id: 'custom', label: 'Custom' },
    ];

    return (
        <div className="bg-gray-50 h-full flex flex-col">
            <Header title="Reminder Settings" onBack={onBack} />
            <div className="p-6 flex-grow flex flex-col">
                <div className="flex-grow">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Reminder Frequency</h2>
                    <div className="bg-white rounded-lg p-2 space-y-1">
                        {frequencyOptions.map(option => (
                            <div key={option.id} onClick={() => setFrequency(option.id)} className="flex justify-between items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100">
                                <span className="text-gray-700">{option.label}</span>
                                <RadioIcon checked={frequency === option.id} />
                            </div>
                        ))}
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-4 mt-8">Reminder Preferences</h2>
                    <div className="bg-white rounded-lg p-2 space-y-1">
                        <div className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-100 rounded-lg">
                            <div>
                                <p className="text-gray-700">Reminder Day & Time</p>
                                <p className="text-sm text-gray-500">Every Monday at 9:00 AM</p>
                            </div>
                            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-100 rounded-lg">
                           <div>
                                <p className="text-gray-700">Product Categories</p>
                                <p className="text-sm text-gray-500">All Categories</p>
                            </div>
                            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                </div>

                <div className="pt-8">
                    <button
                        onClick={onBack}
                        className="w-full bg-[#D52B1E] text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;