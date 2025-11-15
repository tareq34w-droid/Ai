import React, { useState } from 'react';
import { mockDiseaseInfo } from '../data/mockData';
import type { DiseaseInfo } from '../types';

const AccordionItem: React.FC<{
    disease: DiseaseInfo;
    isOpen: boolean;
    onClick: () => void;
    language: 'en' | 'ar';
}> = ({ disease, isOpen, onClick, language }) => {
    const t = language === 'ar' ? {
        treatment: 'العلاج المقترح'
    } : {
        treatment: 'Suggested Treatment'
    };

    return (
        <div className="border-b">
            <button
                onClick={onClick}
                className="w-full text-left rtl:text-right p-4 focus:outline-none flex justify-between items-center"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-semibold text-dark">{disease.name}</h3>
                <svg
                    className={`w-5 h-5 transition-transform transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="p-4 bg-gray-50">
                    <p className="text-gray-600 mb-4">{disease.description}</p>
                    <h4 className="font-bold text-primary">{t.treatment}</h4>
                    <p className="text-gray-600">{disease.treatment}</p>
                </div>
            </div>
        </div>
    );
};

const DiseaseInfoScreen: React.FC<{ language: 'en' | 'ar' }> = ({ language }) => {
    const [openId, setOpenId] = useState<string | null>(null);

    const t = language === 'ar' ? {
        title: 'دليل الأمراض الزراعية',
        description: 'تعرف على أشهر الأمراض التي تصيب المحاصيل وكيفية التعامل معها.'
    } : {
        title: 'Agricultural Disease Guide',
        description: 'Learn about common crop diseases and how to manage them.'
    };

    const handleToggle = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className={`p-4 md:p-6 ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-dark">{t.title}</h1>
                <p className="text-md text-gray-600 mt-2">{t.description}</p>
            </div>
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                {mockDiseaseInfo.map(disease => (
                    <AccordionItem
                        key={disease.id}
                        disease={disease}
                        isOpen={openId === disease.id}
                        onClick={() => handleToggle(disease.id)}
                        language={language}
                    />
                ))}
            </div>
        </div>
    );
};

export default DiseaseInfoScreen;
