import React, { useState, useRef, useEffect } from 'react';
import type { User, TreatmentProduct, Order } from '../types';
import { BellIcon, PlusIcon, EditIcon, TrashIcon } from '../components/Icons';
import Modal from '../components/Modal';

interface ProductFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (productData: { name: string, description: string, price: number, imageUrl: string }) => void;
    language: 'en' | 'ar';
    initialProduct?: TreatmentProduct | null;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({ isOpen, onClose, onSubmit, language, initialProduct }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            if (initialProduct) {
                setName(initialProduct.name);
                setDescription(initialProduct.description);
                setPrice(initialProduct.price.toString());
                setImagePreview(initialProduct.imageUrl);
                setBase64Image(initialProduct.imageUrl); // Use existing URL as base64
            } else {
                // Reset for "Add" mode
                setName('');
                setDescription('');
                setPrice('');
                setImagePreview(null);
                setBase64Image(null);
            }
        }
    }, [initialProduct, isOpen]);


    const t = language === 'ar' ? {
        addTitle: 'إضافة منتج جديد',
        editTitle: 'تعديل المنتج',
        productName: 'اسم المنتج',
        description: 'الوصف',
        price: 'السعر (بالريال اليمني)',
        productImage: 'صورة المنتج',
        changeImage: 'تغيير الصورة',
        uploadImage: 'تحميل صورة',
        submitAdd: 'إضافة وإرسال للمراجعة',
        submitEdit: 'حفظ التغييرات',
        cancel: 'إلغاء',
        fillAllFields: 'يرجى ملء جميع الحقول وتحميل صورة',
    } : {
        addTitle: 'Add New Product',
        editTitle: 'Edit Product',
        productName: 'Product Name',
        description: 'Description',
        price: 'Price (in YER)',
        productImage: 'Product Image',
        changeImage: 'Change Image',
        uploadImage: 'Upload Image',
        submitAdd: 'Add & Submit for Review',
        submitEdit: 'Save Changes',
        cancel: 'Cancel',
        fillAllFields: 'Please fill out all fields and upload an image',
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                setBase64Image(base64);
                setImagePreview(base64);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        if (!name || !description || !price || !base64Image) {
            alert(t.fillAllFields);
            return;
        }
        onSubmit({ name, description, price: parseFloat(price), imageUrl: base64Image });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[60] p-4">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-lg animate-fade-in max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold text-dark mb-6 text-center">{initialProduct ? t.editTitle : t.addTitle}</h2>
                <div className="space-y-4">
                    <div className="text-center">
                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.productImage}</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-32 object-cover rounded-md" />
                                ) : (
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                                <div className="flex text-sm text-gray-600 justify-center">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                                    >
                                        <span>{imagePreview ? t.changeImage : t.uploadImage}</span>
                                    </button>
                                    <input ref={fileInputRef} id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder={t.productName} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                    <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder={t.description} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={3}></textarea>
                    <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder={t.price} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                    <button onClick={handleSubmit} className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">{initialProduct ? t.submitEdit : t.submitAdd}</button>
                    <button onClick={onClose} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors">{t.cancel}</button>
                </div>
            </div>
        </div>
    );
};


const StatusBadge: React.FC<{ status: TreatmentProduct['status'], language: 'en' | 'ar' }> = ({ status, language }) => {
    const statusMap = {
        pending: {
            textAr: 'قيد المراجعة',
            textEn: 'Pending',
            className: 'bg-yellow-100 text-yellow-800',
        },
        approved: {
            textAr: 'مقبول',
            textEn: 'Approved',
            className: 'bg-green-100 text-green-800',
        },
        rejected: {
            textAr: 'مرفوض',
            textEn: 'Rejected',
            className: 'bg-red-100 text-red-800',
        },
    };
    const currentStatus = statusMap[status];

    return (
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${currentStatus.className}`}>
            {language === 'ar' ? currentStatus.textAr : currentStatus.textEn}
        </span>
    );
};

interface MerchantScreenProps {
    user: User;
    products: TreatmentProduct[];
    orders: Order[];
    language: 'en' | 'ar';
    onNavigate: (screen: string) => void;
    onAddProduct: (productData: { name: string; description: string; price: number; imageUrl: string; }) => void;
    onEditProduct: (productId: string, updatedData: { name: string; description: string; price: number; imageUrl: string; }) => void;
    onDeleteProduct: (productId: string) => void;
}

const MerchantScreen: React.FC<MerchantScreenProps> = ({ user, products, orders, language, onNavigate, onAddProduct, onEditProduct, onDeleteProduct }) => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<TreatmentProduct | null>(null);
    const [deletingProduct, setDeletingProduct] = useState<TreatmentProduct | null>(null);

    const t = language === 'ar' ? {
        dashboard: 'لوحة تحكم التاجر',
        welcome: `مرحباً بك، ${user.name}`,
        myProducts: 'منتجاتي المعروضة',
        pendingOrders: 'طلبات معلقة',
        currency: 'ريال',
        noProducts: 'لم تقم بإضافة أي منتجات بعد.',
        viewNotifications: 'عرض الإشعارات',
        addProduct: 'إضافة منتج',
        deleteConfirmTitle: 'تأكيد الحذف؟',
        deleteConfirmText: (productName: string) => `هل أنت متأكد من أنك تريد حذف المنتج "${productName}"؟ لا يمكن التراجع عن هذا الإجراء.`,
        confirmDelete: 'نعم، قم بالحذف',
    } : {
        dashboard: 'Merchant Dashboard',
        welcome: `Welcome, ${user.name}`,
        myProducts: 'My Products',
        pendingOrders: 'Pending Orders',
        currency: 'YER',
        noProducts: 'You have not added any products yet.',
        viewNotifications: 'View Notifications',
        addProduct: 'Add Product',
        deleteConfirmTitle: 'Confirm Deletion?',
        deleteConfirmText: (productName: string) => `Are you sure you want to delete the product "${productName}"? This action cannot be undone.`,
        confirmDelete: 'Yes, Delete',
    };

    const merchantProducts = products.filter(p => p.merchantId === user.id);

    const getPendingOrdersCount = (productId: string) => {
        return orders.filter(o => o.productId === productId && o.status === 'pending').length;
    };
    
    const handleFormSubmit = (productData: { name: string; description: string; price: number; imageUrl: string; }) => {
        if (editingProduct) {
            onEditProduct(editingProduct.id, productData);
        } else {
            onAddProduct(productData);
        }
        setIsFormModalOpen(false);
        setEditingProduct(null);
    };

    const handleDeleteConfirm = () => {
        if (deletingProduct) {
            onDeleteProduct(deletingProduct.id);
            setDeletingProduct(null);
        }
    };

    const handleOpenAddModal = () => {
        setEditingProduct(null);
        setIsFormModalOpen(true);
    };

    return (
        <div className={`p-4 md:p-8 min-h-screen ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
            <header className="flex justify-between items-center mb-8">
                <div className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
                    <h1 className="text-3xl font-bold text-dark">{t.dashboard}</h1>
                    <p className="text-md text-gray-600">{t.welcome}</p>
                </div>
                <button onClick={() => onNavigate('notifications')} className="relative p-2 bg-white rounded-full shadow hover:bg-gray-100" aria-label={t.viewNotifications}>
                    <BellIcon className="w-6 h-6 text-gray-600" />
                </button>
            </header>

            <h2 className="text-2xl font-bold text-dark mb-4">{t.myProducts}</h2>

            {merchantProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {merchantProducts.map(product => {
                        const pendingOrders = getPendingOrdersCount(product.id);
                        return (
                            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                                <div className="relative">
                                    <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto z-10">
                                        <StatusBadge status={product.status} language={language} />
                                    </div>
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
                                </div>
                                <div className="p-4 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-dark flex-grow">{product.name}</h3>
                                    <div className="mt-4 flex justify-between items-center">
                                        <span className="text-xl font-bold text-primary">{product.price} <span className="text-sm font-normal">{t.currency}</span></span>
                                        <div className="relative flex items-center space-x-2 rtl:space-x-reverse bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                                            <BellIcon className="w-5 h-5" />
                                            <span>{pendingOrders}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-2 bg-gray-50 border-t flex justify-end space-x-2 rtl:space-x-reverse">
                                    <button onClick={() => { setEditingProduct(product); setIsFormModalOpen(true); }} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors" aria-label={language === 'ar' ? 'تعديل' : 'Edit'}>
                                        <EditIcon className="w-5 h-5"/>
                                    </button>
                                    <button onClick={() => setDeletingProduct(product)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors" aria-label={language === 'ar' ? 'حذف' : 'Delete'}>
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-10 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500">{t.noProducts}</p>
                </div>
            )}
            
            <button
                onClick={handleOpenAddModal}
                className="fixed bottom-20 right-6 rtl:left-6 rtl:right-auto bg-primary hover:bg-primary-dark text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-transform transform hover:scale-110 z-40"
                aria-label={t.addProduct}
            >
                <PlusIcon className="w-8 h-8" />
            </button>
            
            <ProductFormModal 
                isOpen={isFormModalOpen}
                onClose={() => { setIsFormModalOpen(false); setEditingProduct(null); }}
                onSubmit={handleFormSubmit}
                language={language}
                initialProduct={editingProduct}
            />
            
            {deletingProduct && (
                 <Modal
                    title={t.deleteConfirmTitle}
                    message={t.deleteConfirmText(deletingProduct.name)}
                    onClose={() => setDeletingProduct(null)}
                    language={language}
                    onConfirm={handleDeleteConfirm}
                    confirmText={t.confirmDelete}
                />
            )}
        </div>
    );
};

export default MerchantScreen;