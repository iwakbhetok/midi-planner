
import React, { useState } from 'react';
import { type HouseholdData } from '../types';
import { initialHouseholdData } from '../constants';
import Header from './Header';

interface SetupScreenProps {
  onNext: (data: HouseholdData) => void;
  onBack: () => void;
}

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);


const SetupScreen: React.FC<SetupScreenProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<HouseholdData>(initialHouseholdData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'numberOfPeople' ? parseInt(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };
  
  return (
    <div className="h-full flex flex-col">
       <Header title="Set up your Profile" onBack={onBack} centerTitle={false} />
       <div className="p-6 flex-grow">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Let's set up your household</h2>
        <p className="text-gray-500 mb-8">To tailor your shopping experience, we need a few details about your household.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <select name="numberOfPeople" value={formData.numberOfPeople} onChange={handleChange} className="w-full bg-gray-100 border-none rounded-lg p-4 appearance-none focus:ring-2 focus:ring-[#D52B1E] text-gray-700">
              <option value="" disabled>Number of people in your household</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} person{n > 1 ? 's' : ''}</option>)}
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select name="ageGroup" value={formData.ageGroup} onChange={handleChange} className="w-full bg-gray-100 border-none rounded-lg p-4 appearance-none focus:ring-2 focus:ring-[#D52B1E] text-gray-700">
              <option value="" disabled>Age group</option>
              <option>Under 18</option>
              <option>18-24</option>
              <option>25-34</option>
              <option>35-44</option>
              <option>45+</option>
            </select>
             <ChevronDownIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative">
            <select name="dietaryPreferences" value={formData.dietaryPreferences} onChange={handleChange} className="w-full bg-gray-100 border-none rounded-lg p-4 appearance-none focus:ring-2 focus:ring-[#D52B1E] text-gray-700">
              <option value="" disabled>Dietary preferences</option>
              <option>None</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>Gluten-Free</option>
            </select>
             <ChevronDownIcon className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="bg-gray-100 border-dashed border-2 border-gray-300 rounded-lg p-6 text-center text-gray-500">
            <p>Upload past purchase data (receipts or shopping lists)</p>
            <button type="button" className="text-sm text-[#D52B1E] font-semibold mt-2">Browse files</button>
          </div>
          
          <div className="pt-8">
            <button
              type="submit"
              className="w-full bg-[#D52B1E] text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupScreen;