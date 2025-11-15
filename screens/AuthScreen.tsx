import React, { useState } from 'react';
import { UserRole, StoredUser } from '../types';

interface AuthScreenProps {
    onLogin: (username: string, password?: string) => void;
    onRegister: (details: Omit<StoredUser, 'id'>) => void;
    language: 'en' | 'ar';
    setLanguage: (lang: 'en' | 'ar') => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin, onRegister, language, setLanguage }) => {
    const [isRegisterView, setIsRegisterView] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [regName, setRegName] = useState('');
    const [regPhone, setRegPhone] = useState('');
    const [regUsername, setRegUsername] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regRole, setRegRole] = useState<UserRole>(UserRole.FARMER);

    const t = language === 'ar' ? {
        welcome: 'مرحباً في الوقاية الذكية',
        login: 'تسجيل الدخول',
        register: 'إنشاء حساب جديد',
        username: 'اسم المستخدم',
        password: 'كلمة المرور',
        name: 'الاسم الكامل',
        phone: 'رقم الهاتف',
        role: 'حدد دورك',
        farmer: 'مزارع',
        merchant: 'تاجر',
        guest: 'متابعة كضيف',
        noAccount: 'ليس لديك حساب؟',
        registerHere: 'سجل الآن',
        hasAccount: 'لديك حساب بالفعل؟',
        loginHere: 'ادخل من هنا',
        lang: 'English'
    } : {
        welcome: 'Welcome to Agri-Protect',
        login: 'Login',
        register: 'Create Account',
        username: 'Username',
        password: 'Password',
        name: 'Full Name',
        phone: 'Phone Number',
        role: 'Select your role',
        farmer: 'Farmer',
        merchant: 'Merchant',
        guest: 'Continue as Guest',
        noAccount: "Don't have an account?",
        registerHere: 'Register here',
        hasAccount: 'Already have an account?',
        loginHere: 'Login here',
        lang: 'العربية'
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
    };

    const handleRegisterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!regName || !regPhone || !regUsername || !regPassword) {
            alert(language === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields');
            return;
        }
        onRegister({ name: regName, phone: regPhone, username: regUsername, password: regPassword, role: regRole });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-4">
            <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto">
                <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="bg-white px-4 py-2 rounded-lg shadow font-semibold text-gray-700">
                    {t.lang}
                </button>
            </div>
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 text-center">
                <h1 className="text-3xl font-bold text-primary mb-2">{t.welcome}</h1>
                <p className="text-gray-500 mb-8">{isRegisterView ? t.register : t.login}</p>
                
                {isRegisterView ? (
                    <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
                        <input type="text" value={regName} onChange={e => setRegName(e.target.value)} placeholder={t.name} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        <input type="tel" value={regPhone} onChange={e => setRegPhone(e.target.value)} placeholder={t.phone} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        <input type="text" value={regUsername} onChange={e => setRegUsername(e.target.value)} placeholder={t.username} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        <input type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} placeholder={t.password} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        <select value={regRole} onChange={e => setRegRole(e.target.value as UserRole)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white">
                            <option value={UserRole.FARMER}>{t.farmer}</option>
                            <option value={UserRole.MERCHANT}>{t.merchant}</option>
                        </select>
                        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">{t.register}</button>
                    </form>
                ) : (
                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t.username} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.password} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                        <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">{t.login}</button>
                    </form>
                )}

                <div className="mt-6">
                    <button onClick={() => onLogin('guest')} className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors">
                        {t.guest}
                    </button>
                    <p className="text-sm text-gray-500 mt-4">
                        {isRegisterView ? t.hasAccount : t.noAccount}{' '}
                        <button onClick={() => setIsRegisterView(!isRegisterView)} className="font-semibold text-primary hover:underline">
                            {isRegisterView ? t.loginHere : t.registerHere}
                        </button>
                    </p>
                </div>
                 <p className="text-xs text-gray-400 mt-4">استخدم `saleh` أو `aisha` (كلمة المرور: `password123`)</p>
            </div>
        </div>
    );
};

export default AuthScreen;
