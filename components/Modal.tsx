import React from 'react';
import { InfoIcon } from './Icons';

interface ModalProps {
    title: string;
    message: string;
    onClose: () => void;
    language: 'en' | 'ar';
    onConfirm?: () => void;
    confirmText?: string;
}

const Modal: React.FC<ModalProps> = ({ title, message, onClose, language, onConfirm, confirmText }) => {
    const t = language === 'ar' ? {
        close: 'إغلاق'
    } : {
        close: 'Close'
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100] p-4 animate-fade-in"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 w-full max-w-md text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-full mx-auto flex items-center justify-center mb-4">
                    <InfoIcon className="w-10 h-10" />
                </div>
                <h2 id="modal-title" className="text-2xl font-bold text-dark">{title}</h2>
                <p className="text-gray-600 mt-2">{message}</p>
                <div className="w-full mt-6 space-y-3">
                    {onConfirm && confirmText && (
                        <button 
                            onClick={onConfirm} 
                            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors"
                        >
                            {confirmText}
                        </button>
                    )}
                    <button 
                        onClick={onClose} 
                        className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                    >
                        {t.close}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
