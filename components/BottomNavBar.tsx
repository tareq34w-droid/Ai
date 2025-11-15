import React from 'react';
import { HomeIcon, ChatIcon, DiagnosisIcon, ShopIcon, ProfileIcon } from './Icons';

interface BottomNavBarProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
  language: 'en' | 'ar';
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeScreen, onNavigate, language }) => {
  const t = language === 'ar' ? {
    home: 'الرئيسية',
    chat: 'محادثة',
    diagnosis: 'تشخيص',
    shop: 'المتجر',
    profile: 'ملفي',
  } : {
    home: 'Home',
    chat: 'Chat',
    diagnosis: 'Diagnosis',
    shop: 'Shop',
    profile: 'Profile',
  };

  const navItems = [
    { id: 'home', label: t.home, icon: HomeIcon },
    { id: 'chat', label: t.chat, icon: ChatIcon },
    { id: 'farmer', label: t.diagnosis, icon: DiagnosisIcon, isCentral: true },
    { id: 'shop', label: t.shop, icon: ShopIcon },
    { id: 'profile', label: t.profile, icon: ProfileIcon },
  ];

  const NavItem: React.FC<{ item: typeof navItems[0] }> = ({ item }) => {
    const isActive = activeScreen === item.id;
    if (item.isCentral) {
        return (
             <button
                onClick={() => onNavigate(item.id)}
                className="relative -top-6 bg-primary hover:bg-primary-dark text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
                aria-label={item.label}
            >
                <item.icon className="w-8 h-8" />
            </button>
        )
    }
    return (
      <button
        onClick={() => onNavigate(item.id)}
        className={`flex flex-col items-center justify-center w-full transition-colors ${
          isActive ? 'text-primary' : 'text-gray-500'
        }`}
        aria-current={isActive ? 'page' : undefined}
      >
        <item.icon className="w-6 h-6" />
        <span className="text-xs mt-1">{item.label}</span>
      </button>
    );
  };


  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] h-16 flex justify-around items-center z-50">
      {navItems.map((item) => <NavItem key={item.id} item={item} />)}
    </nav>
  );
};

export default BottomNavBar;
