
import React, { useState } from 'react';
import { type HouseholdData, type ExtractedProduct } from '../types';
import Header from './Header';
import { supabase } from '../lib/supabaseClient';

interface ReviewScreenProps {
  data: HouseholdData;
  products: ExtractedProduct[];
  onConfirm: (submissionId: string) => void;
  onBack: () => void;
}

const ReviewItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="flex justify-between items-center py-4 border-b border-gray-200">
    <p className="text-gray-500">{label}</p>
    <p className="text-gray-800 font-medium text-right">{value}</p>
  </div>
);

const ReviewScreen: React.FC<ReviewScreenProps> = ({ data, products, onConfirm, onBack }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (isSaving) return;
    
    setIsSaving(true);
    setSaveError(null);
    const submissionId = crypto.randomUUID();

    try {
      if (products.length > 0) {
        const productsToInsert = products.map(p => ({
          submission_id: submissionId,
          name: p.productName,
          quantity: p.quantity,
        }));

        const { error } = await supabase.from('products').insert(productsToInsert);

        if (error) {
          throw error;
        }
      }

      onConfirm(submissionId);

    } catch (error) {
      console.error('Failed to save products:', error);
      let message = 'An unknown error occurred while saving your products.';
      if (error instanceof Error) {
          message = error.message;
      } else if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') {
          message = error.message;
      }
      setSaveError(message);
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 h-full flex flex-col">
      <Header title="Review Your Information" onBack={onBack} />
      <div className="p-6 flex-grow flex flex-col overflow-y-auto">
        <div className="flex-grow">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Household Information</h2>
          <div className="bg-white rounded-lg p-4 mb-8 border border-gray-200">
            <ReviewItem label="Number of People" value={data.numberOfPeople} />
            <ReviewItem label="Age Group" value={data.ageGroup} />
            <ReviewItem label="Dietary Preferences" value={data.dietaryPreferences} />
          </div>

          {products.length > 0 && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Extracted Products</h2>
              <div className="bg-white rounded-lg p-4 border border-gray-200 max-h-48 overflow-y-auto">
                <ul className="space-y-2">
                  {products.map((product, index) => (
                    <li key={index} className="flex justify-between items-center text-sm py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700">{product.productName}</span>
                      <span className="font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">Qty: {product.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
        <div className="pt-8">
          {saveError && <p className="text-red-500 text-sm text-center mb-4" role="alert">{saveError}</p>}
          <button
            onClick={handleConfirm}
            disabled={isSaving}
            className="w-full bg-[#D52B1E] text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-wait"
          >
            {isSaving ? 'Saving...' : 'Confirm and Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewScreen;
