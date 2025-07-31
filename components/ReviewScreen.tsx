
import React from 'react';
import { type HouseholdData } from '../types';
import Header from './Header';

interface ReviewScreenProps {
  data: HouseholdData;
  onConfirm: () => void;
  onBack: () => void;
}

const ReviewItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-4 border-b border-gray-200">
    <p className="text-gray-500">{label}</p>
    <p className="text-gray-800 font-medium text-right">{value}</p>
  </div>
);

const ReviewScreen: React.FC<ReviewScreenProps> = ({ data, onConfirm, onBack }) => {
  return (
    <div className="h-full flex flex-col">
      <Header title="Review" onBack={onBack} centerTitle={true} />
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Household Information</h2>
          <div className="bg-white rounded-lg p-4 mb-8">
            <ReviewItem label="Household Name" value={data.householdName} />
            <ReviewItem label="Household Address" value={data.householdAddress} />
            <ReviewItem label="Number of People" value={data.numberOfPeople} />
            <ReviewItem label="Shopping Frequency" value={data.shoppingFrequency} />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Shopping Preferences</h2>
          <div className="bg-white rounded-lg p-4">
             <ReviewItem label="Preferred Store" value={data.preferredStore} />
             <ReviewItem label="Delivery Option" value={data.deliveryOption} />
             <ReviewItem label="Payment Method" value={data.paymentMethod} />
          </div>
        </div>
        <div className="pt-8">
          <button
            onClick={onConfirm}
            className="w-full bg-[#D52B1E] text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewScreen;