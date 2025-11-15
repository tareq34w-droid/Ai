import React from 'react';
import { mockFarmingTips } from '../data/mockData';
import { TipsIcon } from '../components/Icons';

const TipsScreen: React.FC<{ language: 'en' | 'ar' }> = ({ language }) => {
    const t = language === 'ar' ? {
        title: 'نصائح زراعية ذهبية',
        description: 'لزيادة الإنتاجية والحفاظ على صحة محاصيلك'
    } : {
        title: 'Golden Farming Tips',
        description: 'To increase productivity and maintain crop health'
    };
    
    return (
        <div className={`p-4 md:p-6 ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
             <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-dark">{t.title}</h1>
                <p className="text-md text-gray-600 mt-2">{t.description}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mockFarmingTips.map(tip => (
                    <div key={tip.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className="bg-yellow-100 p-3 rounded-full mb-4">
                            <TipsIcon className="w-8 h-8 text-yellow-500" />
                        </div>
                        <h3 className="text-xl font-bold text-dark mb-2">{tip.title}</h3>
                        <p className="text-gray-600 text-base">{tip.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TipsScreen;
