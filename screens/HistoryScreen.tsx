import React, { useState } from 'react';
import type { SavedDiagnosis } from '../types';

// Copied from FarmerScreen for standalone use
const ConfidenceCircle: React.FC<{ score: number }> = ({ score }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;
    const color = score > 80 ? 'text-green-500' : score > 60 ? 'text-yellow-500' : 'text-red-500';

    return (
        <div className="relative w-24 h-24">
            <svg className="transform -rotate-90" width="100%" height="100%" viewBox="0 0 100 100">
                <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                <circle className={color} strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
            </svg>
            <span className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${color}`}>{score}%</span>
        </div>
    );
};

interface HistoryScreenProps {
    diagnoses: SavedDiagnosis[];
    language: 'en' | 'ar';
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ diagnoses, language }) => {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const t = language === 'ar' ? {
        title: 'سجل التشخيص',
        noHistory: 'لم تقم بحفظ أي تشخيصات بعد.',
        confidence: 'نسبة الثقة',
        symptoms: 'الأعراض',
        recommendedTreatment: 'العلاج الموصى به',
        preventiveMeasures: 'إجراءات وقائية',
        viewDetails: 'عرض التفاصيل',
        hideDetails: 'إخفاء التفاصيل',
    } : {
        title: 'Diagnosis History',
        noHistory: 'You have not saved any diagnoses yet.',
        confidence: 'Confidence Score',
        symptoms: 'Symptoms',
        recommendedTreatment: 'Recommended Treatment',
        preventiveMeasures: 'Preventive Measures',
        viewDetails: 'View Details',
        hideDetails: 'Hide Details',
    };
    
    const timeSince = (date: string) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return language === 'ar' ? `قبل ${Math.floor(interval)} سنة` : `${Math.floor(interval)} years ago`;
        interval = seconds / 2592000;
        if (interval > 1) return language === 'ar' ? `قبل ${Math.floor(interval)} شهر` : `${Math.floor(interval)} months ago`;
        interval = seconds / 86400;
        if (interval > 1) return language === 'ar' ? `قبل ${Math.floor(interval)} يوم` : `${Math.floor(interval)} days ago`;
        interval = seconds / 3600;
        if (interval > 1) return language === 'ar' ? `قبل ${Math.floor(interval)} ساعة` : `${Math.floor(interval)} hours ago`;
        interval = seconds / 60;
        if (interval > 1) return language === 'ar' ? `قبل ${Math.floor(interval)} دقيقة` : `${Math.floor(interval)} minutes ago`;
        return language === 'ar' ? 'الآن' : 'just now';
    };
    
    const handleToggle = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <div className={`p-4 md:p-6 min-h-screen bg-gray-100 ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-dark mb-6 text-center">{t.title}</h1>

                {diagnoses.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow-md">
                        <p className="text-gray-500">{t.noHistory}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {diagnoses.map(item => (
                            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <button onClick={() => handleToggle(item.id)} className="w-full p-4 flex items-center space-x-4 rtl:space-x-reverse text-left rtl:text-right">
                                    <img src={`data:image/jpeg;base64,${item.image}`} alt="Crop thumbnail" className="w-16 h-16 object-cover rounded-md flex-shrink-0" />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-dark">{item.result.diseaseName}</h3>
                                        <p className="text-sm text-gray-500">{timeSince(item.savedAt)}</p>
                                    </div>
                                    <div className="text-primary font-semibold text-sm flex items-center space-x-1">
                                        <span>{expandedId === item.id ? t.hideDetails : t.viewDetails}</span>
                                        <svg className={`w-4 h-4 transition-transform ${expandedId === item.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                </button>
                                
                                {expandedId === item.id && (
                                     <div className="p-4 border-t animate-fade-in">
                                        <div className="grid md:grid-cols-2 gap-6 items-start">
                                            <div>
                                                <img src={`data:image/jpeg;base64,${item.image}`} alt="Analyzed crop" className="w-full rounded-lg mb-4" />
                                                <div className="flex items-center justify-center bg-gray-100 p-4 rounded-lg">
                                                    <div className="text-center flex flex-col items-center">
                                                        <h4 className="text-sm font-bold text-gray-500 uppercase mb-2">{t.confidence}</h4>
                                                        <ConfidenceCircle score={item.result.confidence} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-lg font-bold text-dark mb-2 border-b pb-1">{t.symptoms}</h4>
                                                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                                                        {item.result.symptoms.map((symptom, index) => <li key={index}>{symptom}</li>)}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-dark mb-2 border-b pb-1">{t.recommendedTreatment}</h4>
                                                    <p className="text-gray-700">{item.result.recommendedTreatment}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-bold text-dark mb-2 border-b pb-1">{t.preventiveMeasures}</h4>
                                                    <p className="text-gray-700">{item.result.preventiveMeasures}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryScreen;
