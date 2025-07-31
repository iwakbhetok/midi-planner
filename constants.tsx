
import React from 'react';
import { type Product, StockStatus, type HouseholdData } from './types';

export const products: Product[] = [
  { id: 1, name: 'Laundry Detergent', category: 'Household', status: StockStatus.WellStocked, imageUrl: 'https://picsum.photos/seed/detergent/100/100' },
  { id: 2, name: 'Dish Soap', category: 'Household', status: StockStatus.RunningLow, imageUrl: 'https://picsum.photos/seed/soap/100/100' },
  { id: 3, name: 'Paper Towels', category: 'Household', status: StockStatus.OutOfStock, imageUrl: 'https://picsum.photos/seed/papertowel/100/100' },
  { id: 4, name: 'Shampoo', category: 'Personal Care', status: StockStatus.WellStocked, imageUrl: 'https://picsum.photos/seed/shampoo/100/100' },
  { id: 5, name: 'Toothpaste', category: 'Personal Care', status: StockStatus.RunningLow, imageUrl: 'https://picsum.photos/seed/toothpaste/100/100' },
  { id: 6, name: 'Soap', category: 'Personal Care', status: StockStatus.OutOfStock, imageUrl: 'https://picsum.photos/seed/barsoap/100/100' },
];

export const initialHouseholdData: HouseholdData = {
    householdName: 'Family Residence',
    householdAddress: '123 Main Street, Anytown',
    numberOfPeople: 4,
    ageGroup: '25-34',
    dietaryPreferences: 'None',
    shoppingFrequency: 'Weekly',
    preferredStore: 'Alfamidi Supermarket',
    deliveryOption: 'Home Delivery',
    paymentMethod: 'Credit Card',
};
