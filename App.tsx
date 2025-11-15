import React, { useState, useEffect } from 'react';
import type { User, StoredUser, CropInfo, Order, Notification, SavedDiagnosis, DiagnosisResult, TreatmentProduct } from './types';
import { UserRole } from './types';
import { initialUsers, mockCropInfo, mockProducts, mockOrders, mockNotifications } from './data/mockData';

import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';
import AuthScreen from './screens/AuthScreen';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import FarmerScreen from './screens/FarmerScreen';
import ShopScreen from './screens/ShopScreen';
import ChatBotScreen from './screens/ChatBotScreen';
import ProfileScreen from './screens/ProfileScreen';
import TipsScreen from './screens/TipsScreen';
import DiseaseInfoScreen from './screens/DiseaseInfoScreen';
import CropInfoScreen from './screens/CropInfoScreen';
import MerchantScreen from './screens/MerchantScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import HistoryScreen from './screens/HistoryScreen';
import Modal from './components/Modal';

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [users, setUsers] = useState<{ [key: string]: StoredUser }>(initialUsers);
  const [user, setUser] = useState<User | null>(null);
  const [activeScreen, setActiveScreen] = useState('auth');
  const [viewingCrop, setViewingCrop] = useState<CropInfo | null>(null);
  const [products, setProducts] = useState<TreatmentProduct[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [savedDiagnoses, setSavedDiagnoses] = useState<SavedDiagnosis[]>([]);
  const [language, setLanguage] = useState<'en' | 'ar'>('ar');
  const [modalMessage, setModalMessage] = useState<{
    title: string;
    message: string;
    confirmText?: string;
    onConfirm?: () => void;
  } | null>(null);

  useEffect(() => {
    const splashTimer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.className = language === 'ar' ? 'font-cairo' : 'font-sans';
  }, [language]);
  
  const screenTitles = {
    en: {
        home: 'Home',
        farmer: 'AI Diagnosis',
        shop: 'Agri-Store',
        chat: 'AI Assistant',
        profile: 'Profile',
        tips: 'Farming Tips',
        diseases: 'Disease Info',
        cropInfo: 'Crop Information',
        notifications: 'Notifications',
        merchant: 'Merchant Dashboard',
        history: 'Diagnosis History',
    },
    ar: {
        home: 'الرئيسية',
        farmer: 'التشخيص بالذكاء الاصطناعي',
        shop: 'المتجر الزراعي',
        chat: 'المساعد الذكي',
        profile: 'الملف الشخصي',
        tips: 'نصائح زراعية',
        diseases: 'دليل الأمراض',
        cropInfo: 'معلومات المحصول',
        notifications: 'الإشعارات',
        merchant: 'لوحة تحكم التاجر',
        history: 'سجل التشخيص',
    }
  };

  const handleNavigate = (screen: string, payload?: any) => {
      const restrictedForGuest = ['farmer', 'shop', 'profile', 'notifications', 'history'];
      if (user?.role === UserRole.GUEST && restrictedForGuest.includes(screen)) {
          setModalMessage({
              title: language === 'ar' ? 'ميزة للمسجلين فقط' : 'Registered Users Only',
              message: language === 'ar' ? 'يجب عليك تسجيل الدخول للمتابعة.' : 'You must log in to continue.',
              confirmText: language === 'ar' ? 'تسجيل الدخول' : 'Login',
              onConfirm: () => {
                  setModalMessage(null);
                  handleLogout();
              }
          });
          return;
      }
      
      if (screen === 'cropInfo' && payload?.cropId) {
          const crop = mockCropInfo.find(c => c.id === payload.cropId);
          if (crop) {
              setViewingCrop(crop);
              setActiveScreen('cropInfo');
          }
      } else {
          setViewingCrop(null);
          setActiveScreen(screen);
      }
  };

  const handleBack = () => {
    handleNavigate('home');
  };

  const handleLogin = (username: string, password?: string) => {
    if (username === 'guest') {
      setUser({ id: 'guest', name: 'ضيف', username: 'guest', role: UserRole.GUEST });
      handleNavigate('home');
      return;
    }
    const foundUser = users[username];
    if (foundUser && foundUser.password === password) {
      const { password: _password, ...userToSet } = foundUser;
      setUser(userToSet);
      handleNavigate('home');
    } else {
      alert(language === 'ar' ? "اسم المستخدم أو كلمة المرور غير صحيحة!" : "Invalid username or password!");
    }
  };
  
  const handleRegister = (newUser: Omit<StoredUser, 'id'>) => {
      if (users[newUser.username]) {
          alert(language === 'ar' ? 'اسم المستخدم موجود بالفعل!' : 'Username already exists!');
          return;
      }
      const newId = `user${Object.keys(users).length + 1}`;
      const userToStore: StoredUser = { ...newUser, id: newId };

      setUsers(prevUsers => ({ ...prevUsers, [newUser.username]: userToStore }));
      const { password: _password, ...userToSet } = userToStore;
      setUser(userToSet);
      handleNavigate('home');
  };

  const handleLogout = () => {
    setUser(null);
    setActiveScreen('auth');
  };
  
  const handleSaveDiagnosis = (image: string, result: DiagnosisResult) => {
      if (!user || user.role !== UserRole.FARMER) return;
      const newDiagnosis: SavedDiagnosis = {
        id: `diag_${Date.now()}`,
        userId: user.id,
        image,
        result,
        savedAt: new Date().toISOString(),
      };
      setSavedDiagnoses(prev => [newDiagnosis, ...prev]);
  };

  const handlePlaceOrder = (productId: string, quantity: number) => {
    if (!user || user.role !== UserRole.FARMER) return;

    const newOrder: Order = {
        id: `order${Date.now()}`,
        productId,
        quantity,
        farmerId: user.id,
        status: 'pending'
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    
    // Add notification for merchant
    const product = products.find(p => p.id === productId);
    if (product && product.merchantId) {
         const newNotification: Notification = {
            id: `notif_${Date.now()}`,
            userId: product.merchantId,
            type: 'order',
            title: language === 'ar' ? 'لديك طلب جديد!' : 'New Order Received!',
            message: language === 'ar' ? `قام المزارع ${user.name} بطلب منتج "${product.name}" بكمية ${quantity}.` : `Farmer ${user.name} has ordered ${quantity} of "${product.name}".`,
            isRead: false,
            createdAt: new Date().toISOString()
        };
        setNotifications(prev => [newNotification, ...prev]);
    }
  };

  const handleAddProduct = (productData: { name: string; description: string; price: number; imageUrl: string; }) => {
    if (!user || user.role !== UserRole.MERCHANT) return;

    const newProductId = `prod_${Date.now()}`;
    const newProduct: TreatmentProduct = {
      id: newProductId,
      name: productData.name,
      description: productData.description,
      price: Number(productData.price),
      merchantId: user.id,
      imageUrl: productData.imageUrl || `https://placehold.co/400x400/16a34a/FFFFFF/png?text=${encodeURIComponent(productData.name)}`,
      status: 'pending',
    };

    setProducts(prev => [newProduct, ...prev]);

    // Simulate admin approval after a delay
    setTimeout(() => {
      setProducts(prev => prev.map(p => p.id === newProductId ? { ...p, status: 'approved' } : p));
      
      const newNotification: Notification = {
        id: `notif_approve_${newProductId}`,
        userId: user.id,
        type: 'info',
        title: language === 'ar' ? 'تمت الموافقة على منتجك!' : 'Product Approved!',
        message: language === 'ar' ? `تهانينا! تمت الموافقة على منتجك "${productData.name}" وهو الآن معروض في المتجر.` : `Congratulations! Your product "${productData.name}" has been approved and is now live in the shop.`,
        isRead: false,
        createdAt: new Date().toISOString()
      };
      setNotifications(prev => [newNotification, ...prev]);

    }, 5000); // 5-second delay for approval
  };
  
  const handleEditProduct = (productId: string, updatedData: { name: string; description: string; price: number; imageUrl: string; }) => {
    setProducts(prev => prev.map(p => (p.id === productId ? { ...p, ...updatedData } : p)));
    // In a real app, you might want to set the status back to 'pending' for re-approval
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };


  const handleMarkAllRead = () => {
      if (!user) return;
      setNotifications(prev => prev.map(n => {
          const isForUser = (n.userId === user.id) || (n.role === user.role);
          if (isForUser) {
              return { ...n, isRead: true };
          }
          return n;
      }));
  };

  const handleClearAll = () => {
       if (!user) return;
      setNotifications(prev => prev.filter(n => {
          const isForUser = (n.userId === user.id) || (n.role === user.role);
          return !isForUser;
      }));
  };

  const handleUpdateProfile = (name: string, phone: string): { success: boolean; message: string } => {
    if (!user || user.role === UserRole.GUEST) return { success: false, message: 'Invalid action' };
    
    const updatedUser = { ...user, name, phone };
    setUser(updatedUser);

    const userInDb = users[user.username];
    if (userInDb) {
        const updatedUserInDb = { ...userInDb, name, phone };
        setUsers(prev => ({ ...prev, [user.username]: updatedUserInDb }));
    }

    return { success: true, message: language === 'ar' ? 'تم تحديث الملف الشخصي بنجاح!' : 'Profile updated successfully!' };
  };

  const handleUpdatePassword = (currentPassword: string, newPassword: string): { success: boolean; message: string } => {
      if (!user || user.role === UserRole.GUEST) return { success: false, message: 'Invalid action' };
      
      const userInDb = users[user.username];
      if (userInDb && userInDb.password === currentPassword) {
          const updatedUserInDb = { ...userInDb, password: newPassword };
          setUsers(prev => ({ ...prev, [user.username]: updatedUserInDb }));
          return { success: true, message: language === 'ar' ? 'تم تغيير كلمة المرور بنجاح!' : 'Password changed successfully!' };
      } else {
          return { success: false, message: language === 'ar' ? 'كلمة المرور الحالية غير صحيحة.' : 'Incorrect current password.' };
      }
  };

  const handleDeleteAccount = () => {
      if (!user || user.role === UserRole.GUEST) return;
      
      const updatedUsers = { ...users };
      delete updatedUsers[user.username];
      setUsers(updatedUsers);

      handleLogout();
  };

  const renderContent = () => {
    if (showSplash) return <SplashScreen language={language} />;
    if (!user || activeScreen === 'auth') {
      return <AuthScreen onLogin={handleLogin} onRegister={handleRegister} language={language} setLanguage={setLanguage} />;
    }

    if (user.role === UserRole.MERCHANT) {
        // Merchants see their dashboard instead of the regular home screen
        if (activeScreen === 'home' || activeScreen === 'shop') {
            return <MerchantScreen 
                user={user} 
                products={products} 
                orders={orders} 
                language={language} 
                onNavigate={handleNavigate}
                onAddProduct={handleAddProduct}
                onEditProduct={handleEditProduct}
                onDeleteProduct={handleDeleteProduct}
            />;
        }
    }

    switch (activeScreen) {
      case 'home':
        return <HomeScreen user={user} onNavigate={handleNavigate} language={language} />;
      case 'farmer':
        return <FarmerScreen language={language} onSaveDiagnosis={handleSaveDiagnosis} />;
      case 'shop':
         return <ShopScreen 
            language={language} 
            products={products.filter(p => p.status === 'approved')} 
            onPlaceOrder={handlePlaceOrder} 
          />;
      case 'chat':
        return <ChatBotScreen language={language} />;
      case 'tips':
        return <TipsScreen language={language} />;
      case 'diseases':
        return <DiseaseInfoScreen language={language} />;
      case 'cropInfo':
        return viewingCrop ? <CropInfoScreen crop={viewingCrop} onBack={() => handleNavigate('home')} language={language} /> : <HomeScreen user={user} onNavigate={handleNavigate} language={language} />;
      case 'history':
        const userDiagnoses = savedDiagnoses.filter(d => d.userId === user.id);
        return <HistoryScreen diagnoses={userDiagnoses} language={language} />;
      case 'notifications':
        const userNotifications = notifications.filter(n => n.userId === user.id || n.role === user.role);
        return <NotificationsScreen 
            notifications={userNotifications} 
            language={language}
            onMarkAllRead={handleMarkAllRead}
            onClearAll={handleClearAll}
        />;
      case 'profile':
         return <ProfileScreen 
                    user={user} 
                    language={language} 
                    onLogout={handleLogout}
                    onUpdateProfile={handleUpdateProfile}
                    onUpdatePassword={handleUpdatePassword}
                    onDeleteAccount={handleDeleteAccount}
                />;
      default:
        // For merchants, default to their dashboard. For others, default to home.
        return user.role === UserRole.MERCHANT ? <MerchantScreen user={user} products={products} orders={orders} language={language} onNavigate={handleNavigate} onAddProduct={handleAddProduct} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct}/> : <HomeScreen user={user} onNavigate={handleNavigate} language={language} />;
    }
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
      {user && activeScreen !== 'auth' && !showSplash && (
        <Header 
            user={user} 
            language={language} 
            onLogout={handleLogout}
            onBack={handleBack}
            activeScreen={activeScreen}
            screenTitles={screenTitles[language]}
        />
      )}
      <main className={user && !showSplash ? "pt-16 pb-20" : ""}>
        {renderContent()}
      </main>
       {user && activeScreen !== 'auth' && !showSplash && <BottomNavBar activeScreen={activeScreen} onNavigate={handleNavigate} language={language} />}
       
      {modalMessage && (
          <Modal
              title={modalMessage.title}
              message={modalMessage.message}
              onClose={() => setModalMessage(null)}
              language={language}
              onConfirm={modalMessage.onConfirm}
              confirmText={modalMessage.confirmText}
          />
      )}
    </div>
  );
};

export default App;