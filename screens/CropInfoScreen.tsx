import React from 'react';
import type { CropInfo } from '../types';

interface CropInfoScreenProps {
    crop: CropInfo;
    onBack: () => void;
    language: 'en' | 'ar';
}

const CropInfoScreen: React.FC<CropInfoScreenProps> = ({ crop, onBack, language }) => {
    const t = language === 'ar' ? {
        farmingInfo: 'معلومات الزراعة',
        back: 'العودة إلى الرئيسية',
    } : {
        farmingInfo: 'Farming Information',
        back: 'Back to Home',
    };

    return (
        <div className={`p-4 md:p-6 animate-fade-in ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={crop.imageUrl} alt={crop.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-dark mb-4">{crop.name}</h1>
                    <p className="text-gray-700 text-lg mb-6">{crop.description}</p>
                    
                    <div className="bg-light p-4 rounded-md">
                        <h2 className="text-2xl font-bold text-primary mb-3">{t.farmingInfo}</h2>
                        <p className="text-gray-600">{crop.farmingInfo}</p>
                    </div>

                    <div className="mt-8 text-center">
                        <button 
                            onClick={onBack}
                            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors"
                        >
                            {t.back}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropInfoScreen;
