
import React from 'react';
import { type IconProps } from '../types';

const HomeIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 .71-1.71a1 1 0 0 0-.01-.01l-9-9zM18 20H6v-7h12z"/>
  </svg>
);

const CartIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.21 9l-4.38-6.56a1 1 0 0 0-1.66 0L6.79 9H2l4 12h12l4-12h-4.79zM9 9l3-4.5L15 9H9zm3 8c-1.1 0-2-.9-2-2s.9-2 2-2s2 .9 2 2s-.9 2-2 2z"/>
  </svg>
);

const ReceiptIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.78 6.36a1 1 0 0 0-1.06-.21l-1.55.62l-1.55-.62a1 1 0 0 0-1.06.21l-1.55.62l-1.55-.62a1 1 0 0 0-1.06.21l-1.55.62l-1.55-.62a1 1 0 0 0-1.06.21l-1.55.62a1 1 0 0 0-.67 1.28l1.79 6.27a3 3 0 0 0 2.97 2.39h8.36a3 3 0 0 0 2.97-2.39l1.79-6.27a1 1 0 0 0-.67-1.28zM14 16h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2zm3-4H7a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2z"/>
  </svg>
);

const PromoIcon: React.FC<IconProps> = ({ className }) => (
 <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-2.5-4h5v-2h-5v2zm0-4h5v-2h-5v2z"/>
    <path d="M7.05 15.05L12 10l4.95 5.05L18.36 13.64L12 7.27l-6.36 6.36z" transform="scale(0.8) translate(3, 3)"/>
    <path d="M8 8a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm8 0a2 2 0 1 0 0-4a2 2 0 0 0 0 4z" transform="translate(0, 1)"/>
    <path d="M9.5 12c.83 0 1.5.67 1.5 1.5S10.33 15 9.5 15S8 14.33 8 13.5S8.67 12 9.5 12zm5 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5z" transform="translate(0, -1)"/>
  </svg>
);

const AccountIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"/>
  </svg>
);


const NavItem: React.FC<{
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center w-1/5 text-xs focus:outline-none pt-1"
    aria-label={label}
  >
    <Icon className={`w-7 h-7 mb-0.5 transition-colors ${isActive ? 'text-[#D52B1E]' : 'text-gray-400'}`} />
    <span className={`transition-colors font-medium ${isActive ? 'text-[#D52B1E]' : 'text-gray-500'}`}>{label}</span>
  </button>
);

const navItems = [
  { id: 'home', icon: HomeIcon, label: 'Beranda' },
  { id: 'belanja', icon: CartIcon, label: 'Belanja' },
  { id: 'transaksi', icon: ReceiptIcon, label: 'Transaksi' },
  { id: 'promo', icon: PromoIcon, label: 'Promo' },
  { id: 'account', icon: AccountIcon, label: 'Akun' },
];

interface BottomNavProps {
    activeItem: string;
    onNavItemClick: (itemId: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeItem, onNavItemClick }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around py-1.5 z-20">
      {navItems.map((item) => (
        <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.id}
            onClick={() => onNavItemClick(item.id)}
        />
      ))}
    </div>
  );
};

export default BottomNav;
