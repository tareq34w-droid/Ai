import React, { useState } from 'react';
import type { TreatmentProduct } from '../types';

interface ShopScreenProps {
    language: 'en' | 'ar';
    products: TreatmentProduct[];
    onPlaceOrder: (productId: string, quantity: number) => void;
}

const ShopScreen: React.FC<ShopScreenProps> = ({ language, products, onPlaceOrder }) => {
    const [selectedProduct, setSelectedProduct] = useState<TreatmentProduct | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [showPreConfirm, setShowPreConfirm] = useState(false);
    const [showPostConfirm, setShowPostConfirm] = useState(false);

    const t = language === 'ar' ? {
        title: 'المتجر الزراعي',
        products: 'منتجات التجار اليمنيين الموثوقين',
        buy: 'طلب المنتج',
        currency: 'ريال',
        back: 'العودة للمتجر',
        quantity: 'الكمية',
        orderNow: 'أطلب الآن',
        confirmOrderTitle: 'تأكيد الطلب؟',
        confirm: 'تأكيد وإرسال',
        cancel: 'إلغاء',
        orderConfirmedTitle: 'تم تأكيد الطلب!',
        orderConfirmedSubtitle: 'تم إرسال طلبك بنجاح إلى التاجر.',
        modalProduct: 'المنتج',
        modalQuantity: 'الكمية',
        modalTotal: 'الإجمالي',
        merchantContact: 'سيتواصل معك التاجر قريبًا لتأكيد التفاصيل.',
        continueShopping: 'متابعة التسوق',
    } : {
        title: 'Agricultural Store',
        products: 'Products from trusted Yemeni merchants',
        buy: 'Order Product',
        currency: 'YER',
        back: 'Back to Shop',
        quantity: 'Quantity',
        orderNow: 'Order Now',
        confirmOrderTitle: 'Confirm Your Order?',
        confirm: 'Confirm & Send',
        cancel: 'Cancel',
        orderConfirmedTitle: 'Order Confirmed!',
        orderConfirmedSubtitle: 'Your order has been successfully sent to the merchant.',
        modalProduct: 'Product',
        modalQuantity: 'Quantity',
        modalTotal: 'Total',
        merchantContact: 'The merchant will contact you shortly to confirm the details.',
        continueShopping: 'Continue Shopping',
    };
    
    const handleOrderClick = () => {
        if (!selectedProduct) return;
        setShowPreConfirm(true);
    };

    const handleConfirmOrder = () => {
        if (!selectedProduct) return;
        onPlaceOrder(selectedProduct.id, quantity);
        setShowPreConfirm(false);
        setShowPostConfirm(true);
    };

    const handleCloseAllModals = () => {
        setShowPostConfirm(false);
        setTimeout(() => {
            setSelectedProduct(null);
            setQuantity(1);
        }, 300);
    };

    if (selectedProduct) {
        const total = selectedProduct.price * quantity;
        return (
            <>
                <div className={`p-4 md:p-8 animate-fade-in ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-full h-64 object-cover" />
                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-dark">{selectedProduct.name}</h1>
                            <p className="text-gray-600 mt-2 text-lg">{selectedProduct.description}</p>
                            <p className="text-3xl font-bold text-primary my-4">{selectedProduct.price} <span className="text-lg font-normal">{t.currency}</span></p>

                            <div className="flex items-center space-x-4 rtl:space-x-reverse my-4">
                                <label htmlFor="quantity" className="font-bold text-dark">{t.quantity}:</label>
                                <input 
                                    type="number" 
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
                                    min="1"
                                    className="w-20 p-2 border border-gray-300 rounded-md text-center"
                                />
                            </div>

                            <button onClick={handleOrderClick} className="w-full mt-4 bg-secondary text-white py-3 rounded-lg font-bold hover:bg-secondary-dark transition-colors">{t.orderNow}</button>
                            <button onClick={() => setSelectedProduct(null)} className="w-full mt-2 bg-gray-200 text-gray-700 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors">{t.back}</button>
                        </div>
                    </div>
                </div>

                {/* Pre-Confirmation Modal */}
                {showPreConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md text-center animate-fade-in">
                            <h2 className="text-2xl font-bold text-dark">{t.confirmOrderTitle}</h2>
                            <div className="text-left rtl:text-right bg-gray-50 p-4 rounded-lg my-6 space-y-2">
                                <div className="flex justify-between">
                                    <span className="font-semibold text-gray-500">{t.modalProduct}:</span>
                                    <span className="font-bold text-dark">{selectedProduct.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold text-gray-500">{t.modalQuantity}:</span>
                                    <span className="font-bold text-dark">{quantity}</span>
                                </div>
                                <div className="flex justify-between border-t pt-2 mt-2">
                                    <span className="font-semibold text-gray-500">{t.modalTotal}:</span>
                                    <span className="font-bold text-primary text-lg">{total} {t.currency}</span>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button onClick={handleConfirmOrder} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">{t.confirm}</button>
                                <button onClick={() => setShowPreConfirm(false)} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors">{t.cancel}</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Post-Confirmation (Success) Modal */}
                {showPostConfirm && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
                        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md text-center animate-fade-in">
                            <div className="w-16 h-16 bg-green-100 text-primary rounded-full mx-auto flex items-center justify-center mb-4">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-dark">{t.orderConfirmedTitle}</h2>
                            <p className="text-gray-600 mt-2">{t.orderConfirmedSubtitle}</p>
                            <p className="text-sm text-gray-500 mt-4">{t.merchantContact}</p>
                            <button onClick={handleCloseAllModals} className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">{t.continueShopping}</button>
                        </div>
                    </div>
                )}
            </>
        );
    }

    return (
        <div className={`p-4 md:p-8 ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
            <h1 className="text-3xl font-bold text-dark mb-2 text-center">{t.title}</h1>
            <p className="text-center text-gray-600 mb-8">{t.products}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map(product => (
                    <div 
                        key={product.id} 
                        onClick={() => {
                            setQuantity(1);
                            setSelectedProduct(product);
                        }}
                        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                    >
                        <img src={product.imageUrl} alt={product.name} className="w-full h-32 md:h-48 object-cover" />
                        <div className="p-3 md:p-4 flex flex-col flex-grow">
                            <h3 className="text-md md:text-lg font-bold text-dark flex-grow">{product.name}</h3>
                            <div className="mt-4 flex flex-col sm:flex-row justify-between items-center">
                                <span className="text-lg font-bold text-primary mb-2 sm:mb-0">{product.price} <span className="text-sm font-normal">{t.currency}</span></span>
                                <button className="bg-secondary text-white px-3 py-1 text-sm rounded-md hover:bg-secondary-dark w-full sm:w-auto hidden sm:block">{t.buy}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopScreen;