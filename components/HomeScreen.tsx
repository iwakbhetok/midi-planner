
import React from 'react';
import BottomNav from './BottomNav';
import { type IconProps } from '../types';

// --- ICONS ---
const SearchIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
const NotificationIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
);
const CartIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.344 1.087-.849l1.855-6.094a1.875 1.875 0 00-1.755-2.32H5.625M17.25 6.002L16.5 11.25H5.25l-.42-1.5" />
    </svg>
);
const StoreIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0011.25 11.25H4.5A2.25 2.25 0 002.25 13.5V21M3 3h12M3 3v2.25M3 3l11.25 11.25M21 3l-11.25 11.25M21 3h-3.75M21 3v2.25" />
    </svg>
);
const LocationPinIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);
const VoucherIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
        <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"></path>
    </svg>
);

// --- SUB-COMPONENTS ---

const categories = [
    { name: 'EVENT', bg: 'bg-gradient-to-br from-red-400 to-pink-500' },
    { name: 'TEBUS MURAH', bg: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
    { name: 'TEBUS GRATIS', bg: 'bg-gradient-to-br from-teal-400 to-cyan-500' },
    { name: 'TAGIHAN & PULSA', bg: 'bg-gradient-to-br from-blue-400 to-indigo-500' },
    { name: 'HARGA SPESIAL', bg: 'bg-gradient-to-br from-orange-400 to-amber-500' },
    { name: 'GRATIS PRODUK', bg: 'bg-gradient-to-br from-lime-400 to-green-500' },
    { name: 'PAKET BUNDLING', bg: 'bg-gradient-to-br from-purple-400 to-violet-500' },
];

interface HomeScreenProps {
  onBannerClick: () => void;
  onNavigate: (screen: 'home' | 'settings' | 'belanja' | 'transaksi' | 'promo' | 'account') => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onBannerClick, onNavigate }) => {
    
    const handleNavItemClick = (item: string) => {
        if (item === 'account') {
            onNavigate('settings');
        } else if (item !== 'home') {
            alert(`Navigating to "${item}" is not implemented yet.`);
        }
    }

    return (
    <div className="flex flex-col h-full bg-gray-100 relative">
      <main className="flex-grow overflow-y-auto pb-24">
        {/* Header Section */}
        <header className="bg-[#D52B1E] text-white p-4 pb-6 rounded-b-2xl">
          <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="font-bold text-xl tracking-wider">midiKriing</h1>
                <p className="text-xs -mt-1 opacity-80">Anda Pesan Kami Antar</p>
            </div>
            <div className="flex items-center space-x-5">
              <button aria-label="Notifications" className="relative">
                <NotificationIcon className="w-7 h-7" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-yellow-300"></span>
              </button>
              <button aria-label="Cart">
                <CartIcon className="w-7 h-7" />
              </button>
            </div>
          </div>
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Mau belanja apa?" className="w-full bg-white text-gray-800 rounded-lg py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-red-300" />
          </div>
        </header>

        {/* Delivery Info */}
        <section className="bg-white p-4 -mt-4 mx-4 rounded-xl shadow-sm">
            <div className="flex items-center text-xs font-semibold text-blue-800 bg-blue-100 rounded-lg p-3 mb-3">
                <StoreIcon className="w-5 h-5 mr-3"/>
                Pengiriman dari <span className="font-bold mx-1">Toko Honoris Modernland</span>
            </div>
            <div>
                <p className="text-xs text-gray-500 mb-1">Tujuan Pengiriman :</p>
                <div className="flex items-start">
                    <LocationPinIcon className="w-5 h-5 mr-2 mt-0.5 text-red-500 flex-shrink-0"/>
                    <p className="font-semibold text-gray-800 text-xs leading-tight">Lokasi Kamu Saat Ini - Jalan Irmas No. 6, Tangerang, Banten 1...</p>
                </div>
            </div>
        </section>

        {/* Promo Banner */}
        <section className="px-4 mt-4">
            <div onClick={onBannerClick} className="relative bg-blue-300 h-40 rounded-xl p-4 flex flex-col justify-center items-center text-center cursor-pointer overflow-hidden">
                <img src="/assets/images/banner-1.webp" className="absolute inset-0 w-full h-full object-cover"/>
                {/* <div className="relative z-10">
                    <h2 className="text-white text-4xl font-extrabold" style={{ WebkitTextStroke: '2px #D52B1E', textShadow: '3px 3px 0 #D52B1E' }}>NO DRAMA LUPA KEBELI!</h2>
                    <p className="text-white font-semibold mt-2 bg-black bg-opacity-30 px-2 py-1 rounded-md">"Custom Daftar Belanjaan Kamu, Biar Nanti Diingetin Kalo Udah Mau Abis!"</p>
                </div> */}
            </div>
            <div className="flex justify-between items-center mt-2">
                <div className="flex space-x-1.5">
                    <span className="block w-4 h-1.5 bg-[#D52B1E] rounded-full"></span>
                    <span className="block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                    <span className="block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                    <span className="block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                    <span className="block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                </div>
                <a href="#" className="text-sm font-semibold text-blue-600">Lihat Semua</a>
            </div>
        </section>

        {/* User Card */}
        <section className="px-4 mt-4">
            <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
                <div className="text-left">
                    <p className="text-sm text-gray-600">Hai, <span className="font-bold">Abdul</span></p>
                    <p className="text-xs text-gray-500">Poin Member</p>
                    <div className="flex items-center mt-1">
                        <span className="w-5 h-5 rounded-full bg-red-500 text-white font-bold text-xs flex items-center justify-center mr-1.5">P</span>
                        <span className="font-bold text-lg text-gray-800">0</span>
                    </div>
                </div>
                <div className="flex items-center space-x-3 bg-white bg-opacity-50 px-4 py-2 rounded-lg">
                    <div className="text-center">
                        <img src="https://i.imgur.com/vH1Z8Dc.png" alt="A-Koin" className="h-7 w-7 mx-auto"/>
                        <p className="text-xs font-semibold mt-1">A-Koin</p>
                    </div>
                    <div className="w-px h-10 bg-gray-300"></div>
                    <div className="text-center relative">
                        <span className="absolute -top-2 -right-2 text-xs font-bold bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center">1</span>
                        <VoucherIcon className="w-7 h-7 mx-auto text-red-500"/>
                        <p className="text-xs font-semibold mt-1">Voucher</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Categories Grid */}
        <section className="px-4 mt-6">
            <h3 className="font-bold text-lg text-gray-800 mb-3">Spesial di Midi Kriing</h3>
            <div className="grid grid-cols-4 gap-3">
                {categories.slice(0, 4).map(cat => (
                    <div key={cat.name} className={`h-20 rounded-xl flex items-end justify-start p-2 text-white font-bold text-sm leading-tight ${cat.bg}`}>
                        <span dangerouslySetInnerHTML={{ __html: cat.name.replace(' ', '<br/>') }} />
                    </div>
                ))}
            </div>
             <div className="grid grid-cols-3 gap-3 mt-3">
                {categories.slice(4).map(cat => (
                    <div key={cat.name} className={`h-20 rounded-xl flex items-end justify-start p-2 text-white font-bold text-sm leading-tight ${cat.bg}`}>
                        <span dangerouslySetInnerHTML={{ __html: cat.name.replace(' ', '<br/>') }} />
                    </div>
                ))}
            </div>
        </section>
      </main>

      <BottomNav activeItem="home" onNavItemClick={handleNavItemClick} />
    </div>
  );
};

export default HomeScreen;
