
import React, { useState } from 'react';
import Header from './Header';
import { supabase, type Database } from '../lib/supabaseClient';

interface NotificationSettingsScreenProps {
    submissionId: string | null;
    onSave: (phoneNumber: string) => void;
    onBack: () => void;
}

const RadioIcon: React.FC<{ checked: boolean }> = ({ checked }) => (
    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ease-in-out`}
         style={{ borderColor: checked ? '#D52B1E' : '#E5E7EB' }}>
        {checked && <div className="w-3 h-3 bg-[#D52B1E] rounded-full"></div>}
    </div>
);

const CheckboxIcon: React.FC<{ checked: boolean }> = ({ checked }) => (
    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 ease-in-out ${checked ? 'bg-[#D52B1E] border-[#D52B1E]' : 'bg-white border-gray-300'}`}>
        {checked && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
        )}
    </div>
);


const ChevronRightIcon: React.FC<{ className?: string; isRotated?: boolean }> = ({ className, isRotated }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${className} transition-transform duration-300 ${isRotated ? 'transform rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

const NotificationSettingsScreen: React.FC<NotificationSettingsScreenProps> = ({ submissionId, onSave, onBack }) => {
    // Reminder Frequency
    const [frequency, setFrequency] = useState('every_2_weeks');
    const frequencyOptions = [
        { id: 'weekly', label: 'Every week' },
        { id: 'every_2_weeks', label: 'Every 2 weeks' },
        { id: 'monthly', label: 'Every month' },
    ];

    // Reminder Day & Time
    const [isDayTimePickerOpen, setIsDayTimePickerOpen] = useState(false);
    const [reminderDay, setReminderDay] = useState('Monday');
    const [reminderTime, setReminderTime] = useState('09:00');
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    const formatTimeForDisplay = (time: string) => {
        const [hour, minute] = time.split(':');
        const hourNum = parseInt(hour, 10);
        const ampm = hourNum >= 12 ? 'PM' : 'AM';
        const formattedHour = hourNum % 12 || 12;
        return `${formattedHour}:${minute} ${ampm}`;
    };

    // Product Categories
    const [isCategoryPickerOpen, setIsCategoryPickerOpen] = useState(false);
    const allCategories = ['Household', 'Personal Care'];
    const [selectedCategories, setSelectedCategories] = useState<string[]>(allCategories);

    // Phone Number
    const [phoneNumber, setPhoneNumber] = useState('');

    // Save state
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);


    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const toggleSelectAllCategories = () => {
        if (selectedCategories.length === allCategories.length) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(allCategories);
        }
    };
    
    const getCategoryDisplayText = () => {
        if (selectedCategories.length === allCategories.length) return 'All Categories';
        if (selectedCategories.length === 0) return 'No categories selected';
        return selectedCategories.join(', ');
    };

    const handleSaveChanges = async () => {
        setIsSaving(true);
        setSaveError(null);

        // Submission ID validation
        if (!submissionId) {
            setSaveError('Submission ID is missing. Please go back and complete the setup process.');
            setIsSaving(false);
            return;
        }

        // Basic validation
        if (!phoneNumber || !/^\+?[0-9\s-()]{10,}$/.test(phoneNumber)) {
            setSaveError('Please enter a valid phone number.');
            setIsSaving(false);
            return;
        }

        try {
            const settingsData: Database['public']['Tables']['notification_settings']['Insert'] = {
                frequency: frequency,
                reminder_day: reminderDay,
                reminder_time: reminderTime,
                product_categories: selectedCategories,
                phone_number: phoneNumber,
                submission_id: submissionId,
            };

            const { error } = await supabase
                .from('notification_settings')
                .insert([settingsData]);

            if (error) throw error;
            
            onSave(phoneNumber); // Navigate to the next screen on success

        } catch (error) {
            console.error('Error saving settings:', error);
            let message = 'An unknown error occurred.';
            if (error instanceof Error) {
                message = error.message;
            } else if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
                message = error.message;
            } else if (typeof error === 'string') {
                message = error;
            }
            setSaveError(`Failed to save settings: ${message}`);
        } finally {
            setIsSaving(false);
        }
    };


    return (
        <div className="bg-white h-full flex flex-col">
            <Header title="Reminder Settings" onBack={onBack} centerTitle={true} />
            <div className="p-6 flex-grow flex flex-col overflow-y-auto">
                <div className="flex-grow">
                    {/* Reminder Frequency */}
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Reminder Frequency</h2>
                    <div className="bg-white rounded-xl border border-gray-200">
                        {frequencyOptions.map((option, index) => (
                            <div
                                key={option.id}
                                onClick={() => setFrequency(option.id)}
                                className={`flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 ${index < frequencyOptions.length - 1 ? 'border-b border-gray-200' : ''}`}
                            >
                                <span className="text-gray-800 font-medium">{option.label}</span>
                                <RadioIcon checked={frequency === option.id} />
                            </div>
                        ))}
                    </div>

                    {/* Reminder Preferences */}
                    <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">Reminder Preferences</h2>
                    <div className="bg-white rounded-xl border border-gray-200">
                        {/* Day & Time Picker */}
                        <div className="border-b border-gray-200">
                            <div onClick={() => setIsDayTimePickerOpen(!isDayTimePickerOpen)} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                                <div>
                                    <p className="font-medium text-gray-800">Reminder Day & Time</p>
                                    <p className="text-sm text-gray-500">{`Every ${reminderDay} at ${formatTimeForDisplay(reminderTime)}`}</p>
                                </div>
                                <ChevronRightIcon className="w-5 h-5 text-gray-400" isRotated={isDayTimePickerOpen} />
                            </div>
                            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isDayTimePickerOpen ? 'max-h-40' : 'max-h-0'}`}>
                                <div className="p-4 bg-gray-50/50 space-y-4">
                                    <div className="relative">
                                        <label htmlFor="reminder-day" className="block text-sm font-medium text-gray-600 mb-1">Day</label>
                                        <select id="reminder-day" value={reminderDay} onChange={e => setReminderDay(e.target.value)} className="w-full bg-white border border-gray-300 rounded-lg p-2 appearance-none focus:ring-2 focus:ring-[#D52B1E] text-gray-700">
                                            {daysOfWeek.map(day => <option key={day} value={day}>{day}</option>)}
                                        </select>
                                    </div>
                                    <div className="relative">
                                        <label htmlFor="reminder-time" className="block text-sm font-medium text-gray-600 mb-1">Time</label>
                                        <input type="time" id="reminder-time" value={reminderTime} onChange={e => setReminderTime(e.target.value)} className="w-full bg-white border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#D52B1E] text-gray-700"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Category Picker */}
                        <div>
                            <div onClick={() => setIsCategoryPickerOpen(!isCategoryPickerOpen)} className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50">
                               <div>
                                    <p className="font-medium text-gray-800">Product Categories</p>
                                    <p className="text-sm text-gray-500">{getCategoryDisplayText()}</p>
                                </div>
                                <ChevronRightIcon className="w-5 h-5 text-gray-400" isRotated={isCategoryPickerOpen} />
                            </div>
                             <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isCategoryPickerOpen ? 'max-h-48' : 'max-h-0'}`}>
                                <div className="p-4 bg-gray-50/50 space-y-3">
                                    <div onClick={toggleSelectAllCategories} className="flex items-center space-x-3 cursor-pointer">
                                        <CheckboxIcon checked={selectedCategories.length === allCategories.length} />
                                        <span className="font-medium text-gray-800">All Categories</span>
                                    </div>
                                    <hr className="my-2"/>
                                    {allCategories.map(cat => (
                                         <div key={cat} onClick={() => handleCategoryChange(cat)} className="flex items-center space-x-3 cursor-pointer">
                                            <CheckboxIcon checked={selectedCategories.includes(cat)} />
                                            <span className="text-gray-700">{cat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Contact Information */}
                    <h2 className="text-lg font-bold text-gray-900 mb-4 mt-8">Contact Information</h2>
                    <div className="bg-white rounded-xl border border-gray-200 p-4">
                         <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                         <input
                            type="tel"
                            id="phone-number"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            placeholder="+62 812 3456 7890"
                            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#D52B1E] text-gray-800"
                            aria-describedby="phone-number-description"
                         />
                         <p id="phone-number-description" className="text-xs text-gray-500 mt-2">We'll use this number to send Whatsapp reminders.</p>
                    </div>
                </div>

                <div className="pt-8 mt-auto">
                    {saveError && <p className="text-red-500 text-sm text-center mb-4">{saveError}</p>}
                    <button
                        onClick={handleSaveChanges}
                        disabled={isSaving}
                        className="w-full bg-[#D52B1E] text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D52B1E] disabled:bg-gray-400 disabled:cursor-wait"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettingsScreen;
