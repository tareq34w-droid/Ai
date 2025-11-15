import React from 'react';
import type { User, CarouselSlide } from '../types';
import { UserRole } from '../types';
import Carousel from '../components/Carousel';
import { mockSlides } from '../data/mockData';
import { CameraIcon, TipsIcon, ChatIcon, ShopIcon, InfoIcon, BellIcon, HistoryIcon } from '../components/Icons';

interface HomeScreenProps {
  user: User;
  onNavigate: (screen: string, payload?: any) => void;
  language: 'en' | 'ar';
}

const HomeScreen: React.FC<HomeScreenProps> = ({ user, onNavigate, language }) => {
  const t = language === 'ar' ? {
    welcome: `مرحباً بك، ${user.username}`,
    slogan: 'الوقاية الذكية لحماية محاصيلك',
    diagnosis: 'التشخيص بالكاميرا',
    tips: 'نصائح زراعية',
    chat: 'المحادثة الذكية',
    shop: 'المتجر الزراعي',
    diseases: 'معلومات الأمراض',
    notifications: 'الإشعارات',
    history: 'سجل التشخيص',
  } : {
    welcome: `Welcome, ${user.username}`,
    slogan: 'Smart protection for your crops',
    diagnosis: 'Camera Diagnosis',
    tips: 'Farming Tips',
    chat: 'AI Chat',
    shop: 'Agri-Store',
    diseases: 'Disease Info',
    notifications: 'Notifications',
    history: 'Diagnosis History',
  };

  const baseFeatures = [
    { title: t.diagnosis, icon: CameraIcon, screen: 'farmer', color: 'bg-green-500' },
    { title: t.tips, icon: TipsIcon, screen: 'tips', color: 'bg-yellow-500' },
    { title: t.chat, icon: ChatIcon, screen: 'chat', color: 'bg-blue-500' },
    { title: t.shop, icon: ShopIcon, screen: 'shop', color: 'bg-orange-500' },
    { title: t.diseases, icon: InfoIcon, screen: 'diseases', color: 'bg-purple-500' },
    { title: t.notifications, icon: BellIcon, screen: 'notifications', color: 'bg-red-500' },
  ];
  
  if (user.role === UserRole.FARMER) {
      baseFeatures.push({ title: t.history, icon: HistoryIcon, screen: 'history', color: 'bg-teal-500' });
  }


  const handleCarouselClick = (slide: CarouselSlide) => {
    onNavigate('cropInfo', { cropId: slide.cropId });
  };

  return (
    <div className={`p-4 md:p-6 space-y-6 ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
      <header className={`${language === 'ar' ? 'text-right' : 'text-left'}`}>
        <h1 className="text-2xl font-bold text-dark">{t.welcome}</h1>
        <p className="text-md text-gray-600">{t.slogan}</p>
      </header>

      <Carousel slides={mockSlides} language={language} onSlideClick={handleCarouselClick} />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {baseFeatures.map((feature) => (
          <button
            key={feature.screen}
            onClick={() => onNavigate(feature.screen)}
            className="flex flex-col items-center justify-center text-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white ${feature.color}`}>
              <feature.icon className="w-8 h-8" />
            </div>
            <span className="mt-3 font-semibold text-gray-700">{feature.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;