import React from 'react';
import type { User } from '../types';
import { LeafIcon, LogoutIcon, ArrowLeftIcon } from './Icons';

interface HeaderProps {
  user: User | null;
  language: 'en' | 'ar';
  activeScreen: string;
  screenTitles: { [key: string]: string };
  onBack: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, language, activeScreen, screenTitles, onBack, onLogout }) => {
  const translations = {
    en: { appTitle: 'Agri-Protect AI', logout: 'Logout', back: 'Back' },
    ar: { appTitle: 'الوقاية الذكية للمحاصيل', logout: 'خروج', back: 'رجوع' },
  };
  const t = translations[language];
  const isHomePage = activeScreen === 'home';
  const currentTitle = isHomePage ? t.appTitle : screenTitles[activeScreen] || '';

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className="flex-1 flex items-center space-x-3 rtl:space-x-reverse">
        {!isHomePage ? (
          <button onClick={onBack} className="text-gray-600 hover:text-primary p-1" aria-label={t.back}>
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        ) : (
          <LeafIcon className="w-8 h-8 text-primary" />
        )}
        <h1 className={`text-xl font-bold text-gray-800 truncate ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>{currentTitle}</h1>
      </div>
      {user && (
        <div className="flex items-center">
            <button onClick={onLogout} className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-red-500 transition-colors px-3 py-1 rounded-md hover:bg-red-50" aria-label={t.logout}>
                <span className="font-semibold text-sm">{t.logout}</span>
                <LogoutIcon className="w-5 h-5"/>
            </button>
        </div>
      )}
    </header>
  );
};

export default Header;