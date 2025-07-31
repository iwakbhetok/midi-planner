import React from 'react';

interface PaymentScreenProps {
    totalAmount: number;
    itemCount: number;
    onBack: () => void;
}

const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
);

const PaymentScreen: React.FC<PaymentScreenProps> = ({ totalAmount, itemCount, onBack }) => {

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount).replace('Rp', 'Rp ').trim();
    };

    return (
        <div className="h-full flex flex-col">
            <header className="p-4 flex items-center bg-[#D52B1E] text-white sticky top-0 z-10 shadow-md">
                <button onClick={onBack} className="p-2 -ml-2 mr-2">
                  <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-semibold w-full text-center -ml-10">Pembayaran</h1>
            </header>
            
            <main className="flex-grow overflow-y-auto p-4 space-y-4">
                {/* Total Pesanan Card */}
                <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="text-base font-semibold text-gray-800 mb-3">Total Pesanan</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex justify-between text-gray-600">
                            <span>Jumlah Item</span>
                            <span className="font-medium text-gray-800">{itemCount}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Total</span>
                            <span className="font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
                        </div>
                    </div>
                </div>

                {/* QR Code Card */}
                <div className="bg-white rounded-lg shadow p-6 text-center">
                    <img
                        src="/assets/images/qr-code.png"
                        alt="QRIS Payment Code"
                        className="w-56 h-56 mx-auto"
                    />
                    <p className="text-sm text-gray-500 mt-4 mb-4">Scan QRIS di atas untuk membayar tagihan</p>
                    <button className="bg-[#D52B1E] text-white font-semibold py-2 px-8 rounded-lg text-sm hover:bg-opacity-90 transition-colors">
                        Simpan QR
                    </button>
                </div>
            </main>

            <footer className="p-4">
                 <button
                    className="w-full bg-[#D52B1E] text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    Cek Status Pembayaran
                </button>
            </footer>
        </div>
    );
};

export default PaymentScreen;
