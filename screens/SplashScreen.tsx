import React from 'react';

const SplashScreen: React.FC<{ language: 'en' | 'ar' }> = ({ language }) => (
    <div className="flex flex-col items-center justify-center h-screen bg-primary text-white animate-fade-in">
        <div className="text-center">
            <h1 className={`text-5xl font-bold ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
                {language === 'ar' ? 'الوقاية الذكية للمحاصيل' : 'Agri-Protect AI'}
            </h1>
            <p className="mt-4 text-xl opacity-80">{language === 'ar' ? 'نحو زراعة يمنية حديثة...' : 'Towards modern Yemeni agriculture...'}</p>
        </div>
    </div>
);

export default SplashScreen;
