
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { type ProductWithDetails } from '../types';
import PaymentScreen from './PaymentScreen';

interface CheckoutScreenProps {
    submissionId: string;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ submissionId }) => {
    const [products, setProducts] = useState<ProductWithDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);
    const [showPayment, setShowPayment] = useState(false);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount).replace('Rp', 'Rp ').trim();
    };

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            const { data, error: dbError } = await supabase
                .from('products')
                .select('name, quantity')
                .eq('submission_id', submissionId);

            if (dbError) {
                setError('Failed to fetch product data. Please check the link and try again.');
                console.error(dbError);
                setLoading(false);
                return;
            }

            if (!data || data.length === 0) {
                setError('No products found for this order.');
                setLoading(false);
                return;
            }

            let subtotal = 0;
            const productsWithDetails = data.map((item, index) => {
                const price = Math.floor(Math.random() * (30000 - 5000 + 1)) + 5000; // Dummy price between 5k and 30k
                subtotal += price * item.quantity;
                return {
                    productName: item.name,
                    quantity: item.quantity,
                    price: price,
                    imageUrl: `https://picsum.photos/seed/${item.name.replace(/\s/g, '')}${index}/100/100`,
                };
            });

            setProducts(productsWithDetails);
            setTotal(subtotal);
            setLoading(false);
        };

        fetchProducts();
    }, [submissionId]);

    if (showPayment) {
        return <PaymentScreen totalAmount={total} itemCount={products.length} onBack={() => setShowPayment(false)} />;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <svg className="animate-spin h-8 w-8 text-[#D52B1E]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }

    if (error) {
        return <div className="flex items-center justify-center h-full p-6 text-center text-red-500">{error}</div>;
    }

    return (
        <div className="h-full flex flex-col">
            {/* <header className="p-4 flex items-center bg-white sticky top-0 z-10 border-b">
                <h1 className="text-xl font-semibold text-gray-800 w-full text-center">Checkout</h1>
            </header> */}
            <header className="p-4 flex items-center bg-[#D52B1E] text-white sticky top-0 z-10 shadow-md">
                <h1 className="text-xl font-semibold w-full text-center">Checkout</h1>
            </header>

            <main className="flex-grow overflow-y-auto p-4 space-y-4">
                {/* Kurir */}
                <div className="bg-white rounded-lg p-4">
                    <h2 className="font-semibold text-gray-800 mb-3">Kurir</h2>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img src="/assets/images/kurir.jpg" alt="Alfamidi Logo" className="w-8 h-8 mr-4"/>
                            <div>
                                <p className="font-semibold text-gray-800">Gratis</p>
                                <p className="text-sm text-gray-500">Same Day (1 hari)</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Waktu Pengiriman */}
                {/* <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center justify-between mb-1">
                        <h2 className="font-semibold text-gray-800">Waktu Pengiriman</h2>
                        <button className="text-sm font-semibold text-blue-600">Ubah Waktu</button>
                    </div>
                    <p className="text-gray-500 text-sm">Pilih Waktu Pengiriman</p>
                </div> */}

                {/* Pesanan */}
                <div className="bg-white rounded-lg p-4">
                    <h2 className="font-semibold text-gray-800 mb-3">Pesanan</h2>
                    <div className="space-y-4">
                        {products.map((product, index) => (
                            <div key={index} className="flex items-start justify-between">
                                <div className="flex items-start">
                                    <img src={product.imageUrl} alt={product.productName} className="w-16 h-16 rounded-md mr-4 object-cover"/>
                                    <div>
                                        <p className="font-medium text-gray-800 leading-tight">{product.productName}</p>
                                        <p className="text-sm text-gray-600 font-semibold mt-1">{formatCurrency(product.price)}</p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm">x{product.quantity}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rincian Biaya */}
                <div className="bg-white rounded-lg p-4">
                    <h2 className="font-semibold text-gray-800 mb-3">Rincian Biaya</h2>
                    <div className="space-y-2 text-sm">
                         <div className="flex justify-between">
                            <p className="text-gray-500">Subtotal</p>
                            <p className="text-gray-800 font-medium">{formatCurrency(total)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500">Biaya Pengiriman</p>
                            <p className="text-gray-800 font-medium">{formatCurrency(0)}</p>
                        </div>
                         <div className="flex justify-between">
                            <p className="text-gray-500">Potongan</p>
                            <p className="text-red-500 font-medium">- {formatCurrency(0)}</p>
                        </div>
                        <hr className="my-3"/>
                         <div className="flex justify-between font-bold text-base">
                            <p className="text-gray-800">Total Belanja</p>
                            <p className="text-gray-800">{formatCurrency(total)}</p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="p-4 bg-white border-t">
                <button
                    onClick={() => setShowPayment(true)}
                    className="w-full bg-[#D52B1E] text-white font-bold py-3 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                >
                    Bayar Sekarang
                </button>
            </footer>
        </div>
    );
};

export default CheckoutScreen;
