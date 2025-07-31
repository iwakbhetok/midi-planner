
import React, { useState } from 'react';
import { type HouseholdData, type ExtractedProduct } from '../types';
import { initialHouseholdData } from '../constants';
import Header from './Header';
import { GoogleGenAI, Type } from '@google/genai';


interface SetupScreenProps {
  onNext: (data: HouseholdData, products: ExtractedProduct[]) => void;
  onBack: () => void;
}

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);

const PencilIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L13.196 4.196z" />
    </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const SetupScreen: React.FC<SetupScreenProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<HouseholdData>(initialHouseholdData);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedProducts, setExtractedProducts] = useState<ExtractedProduct[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<ExtractedProduct>({ productName: '', quantity: 1 });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'numberOfPeople' ? parseInt(value) : value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setReceiptFile(e.target.files[0]);
        setExtractedProducts([]);
        setError(null);
    }
  };

  const fileToGenerativePart = (file: File) => {
    return new Promise<{ inlineData: { data: string; mimeType: string } }>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result !== 'string') {
                return reject(new Error('File could not be read as a data URL.'));
            }
            const base64Data = reader.result.split(',')[1];
            resolve({
                inlineData: {
                    mimeType: file.type,
                    data: base64Data
                }
            });
        };
        reader.onerror = (error) => reject(error);
    });
  };

  const handleProcessReceipt = async () => {
    if (!receiptFile || isProcessing) return;

    setIsProcessing(true);
    setError(null);
    setExtractedProducts([]);

    try {
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
            throw new Error("API key is missing.");
        }
        const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
        const imagePart = await fileToGenerativePart(receiptFile);

        const textPart = {
            text: `Analyze this Alfamidi receipt. Extract all items, including their names and quantities. Ignore taxes, totals, and other non-product information.`
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        products: {
                            type: Type.ARRAY,
                            description: "A list of products from the receipt.",
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    productName: {
                                        type: Type.STRING,
                                        description: 'The full name of the product.',
                                    },
                                    quantity: {
                                        type: Type.INTEGER,
                                        description: 'The quantity of the product purchased.',
                                    },
                                },
                                required: ["productName", "quantity"],
                            },
                        }
                    },
                    required: ["products"],
                },
            }
        });

        const resultText = response.text.trim();
        const resultJson = JSON.parse(resultText);

        if (resultJson.products && Array.isArray(resultJson.products)) {
            setExtractedProducts(resultJson.products);
             if (resultJson.products.length === 0) {
                setError("No products could be extracted. Please try a clearer image.");
            }
        } else {
             throw new Error('Could not find products in the AI response.');
        }

    } catch (e) {
        console.error(e);
        setError('Failed to process receipt. The AI could not read the image, or the file is not a valid receipt. Please try another image.');
    } finally {
        setIsProcessing(false);
    }
  };

  const handleRemoveProduct = (indexToRemove: number) => {
    setExtractedProducts(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditedProduct(extractedProducts[index]);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleSaveEdit = () => {
    if (editingIndex === null) return;
    const updatedProducts = [...extractedProducts];
    updatedProducts[editingIndex] = editedProduct;
    setExtractedProducts(updatedProducts);
    setEditingIndex(null);
  };

  const handleEditedProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct(prev => ({
        ...prev,
        [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData, extractedProducts);
  };
  
  return (
    <div className="h-full flex flex-col">
       <Header title="Set up your Profile" onBack={onBack} centerTitle={false} />
       <div className="p-6 flex-grow overflow-y-auto">
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
              <p className="font-semibold mb-2">Upload past purchase data</p>
              <p className="text-sm mb-4">Upload a receipt to automatically add products.</p>

              <input
                  type="file"
                  id="receipt-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isProcessing}
              />

              {!receiptFile && !isProcessing && (
                  <label
                      htmlFor="receipt-upload"
                      className="cursor-pointer text-sm text-white bg-[#D52B1E] font-semibold py-2 px-4 rounded-lg inline-block hover:bg-opacity-90"
                  >
                      Browse files
                  </label>
              )}

              {receiptFile && !isProcessing && (
                  <div className="text-left text-sm mt-4">
                      <p>Selected: <span className="font-medium text-gray-700">{receiptFile.name}</span></p>
                      <div className="flex space-x-2 mt-4">
                          <button
                              type="button"
                              onClick={handleProcessReceipt}
                              className="flex-1 bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                          >
                              Process Receipt
                          </button>
                          <button
                              type="button"
                              onClick={() => {
                                setReceiptFile(null);
                                setExtractedProducts([]);
                                setError(null);
                              }}
                              className="flex-0 bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors"
                          >
                              Clear
                          </button>
                      </div>
                  </div>
              )}

              {isProcessing && (
                  <div className="flex items-center justify-center text-gray-600 text-sm" role="status">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#D52B1E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing your receipt...
                  </div>
              )}

              {error && <p className="text-red-500 text-sm mt-4" role="alert">{error}</p>}
          </div>

          {extractedProducts.length > 0 && (
              <div className="mt-2">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Extracted Products</h3>
                  <ul className="bg-white rounded-lg p-4 space-y-2 border max-h-48 overflow-y-auto">
                      {extractedProducts.map((product, index) => (
                          <li key={index} className="flex items-center text-sm py-2 border-b border-gray-100 last:border-b-0">
                               {editingIndex === index ? (
                                    <div className="flex items-center space-x-2 w-full">
                                        <input
                                            type="text"
                                            name="productName"
                                            value={editedProduct.productName}
                                            onChange={handleEditedProductChange}
                                            className="flex-grow bg-gray-50 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-[#D52B1E] focus:border-[#D52B1E]"
                                            autoFocus
                                        />
                                        <input
                                            type="number"
                                            name="quantity"
                                            value={editedProduct.quantity}
                                            onChange={handleEditedProductChange}
                                            className="w-16 bg-gray-50 border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-1 focus:ring-[#D52B1E] focus:border-[#D52B1E]"
                                            min="1"
                                        />
                                        <button type="button" onClick={handleSaveEdit} className="text-sm font-semibold text-green-600 hover:text-green-800">Save</button>
                                        <button type="button" onClick={handleCancelEdit} className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center w-full">
                                        <span className="text-gray-700 flex-1 pr-4">{product.productName}</span>
                                        <div className="flex items-center space-x-3 flex-shrink-0">
                                            <span className="font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">Qty: {product.quantity}</span>
                                            <button type="button" onClick={() => handleStartEdit(index)} className="text-blue-600 hover:text-blue-800 p-1" aria-label="Edit item">
                                                <PencilIcon className="w-4 h-4" />
                                            </button>
                                            <button type="button" onClick={() => handleRemoveProduct(index)} className="text-red-500 hover:text-red-700 p-1" aria-label="Remove item">
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                          </li>
                      ))}
                  </ul>
              </div>
          )}
          
          <div className="pt-8">
            <button
              type="submit"
              disabled={extractedProducts.length === 0}
              className="w-full bg-[#D52B1E] text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
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