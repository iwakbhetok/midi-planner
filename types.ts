
export enum StockStatus {
  WellStocked = 'Well Stocked',
  RunningLow = 'Running Low',
  OutOfStock = 'Out of Stock'
}

export interface Product {
  id: number;
  name: string;
  category: 'Household' | 'Personal Care';
  status: StockStatus;
  imageUrl: string;
}

export interface HouseholdData {
  householdName: string;
  householdAddress: string;
  numberOfPeople: number;
  ageGroup: string;
  dietaryPreferences: string;
  shoppingFrequency: string;
  preferredStore: string;
  deliveryOption: string;
  paymentMethod: string;
}

export type IconProps = {
  className?: string;
};
