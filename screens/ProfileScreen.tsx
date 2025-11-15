import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import { LogoutIcon, UserIcon } from '../components/Icons';

interface ProfileScreenProps {
    user: User;
    language: 'en' | 'ar';
    onLogout: () => void;
    onUpdateProfile: (name: string, phone: string) => { success: boolean; message: string };
    onUpdatePassword: (current: string, newPass: string) => { success: boolean; message: string };
    onDeleteAccount: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, language, onLogout, onUpdateProfile, onUpdatePassword, onDeleteAccount }) => {
    const isGuest = user.role === 'guest';
    
    // Profile form state
    const [name, setName] = useState(user.name);
    const [phone, setPhone] = useState(user.phone || '');
    const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Password form state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Delete confirmation state
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    useEffect(() => {
        setName(user.name);
        setPhone(user.phone || '');
    }, [user]);

    const t = language === 'ar' ? {
        title: 'الملف الشخصي',
        editProfile: 'تعديل الملف الشخصي',
        fullName: 'الاسم الكامل',
        phone: 'رقم الهاتف',
        saveChanges: 'حفظ التغييرات',
        changePassword: 'تغيير كلمة المرور',
        currentPassword: 'كلمة المرور الحالية',
        newPassword: 'كلمة المرور الجديدة',
        confirmNewPassword: 'تأكيد كلمة المرور الجديدة',
        updatePassword: 'تحديث كلمة المرور',
        logout: 'تسجيل الخروج',
        deleteAccount: 'حذف الحساب',
        deleteConfirmTitle: 'هل أنت متأكد؟',
        deleteConfirmText: 'سيتم حذف حسابك بشكل دائم. لا يمكن التراجع عن هذا الإجراء.',
        cancel: 'إلغاء',
        confirmDelete: 'نعم، قم بالحذف',
        guestMessage: 'يرجى تسجيل الدخول للوصول إلى هذه الميزات.',
        passwordMismatch: 'كلمتا المرور الجديدتان غير متطابقتين.',
    } : {
        title: 'Profile',
        editProfile: 'Edit Profile',
        fullName: 'Full Name',
        phone: 'Phone Number',
        saveChanges: 'Save Changes',
        changePassword: 'Change Password',
        currentPassword: 'Current Password',
        newPassword: 'New Password',
        confirmNewPassword: 'Confirm New Password',
        updatePassword: 'Update Password',
        logout: 'Logout',
        deleteAccount: 'Delete Account',
        deleteConfirmTitle: 'Are you sure?',
        deleteConfirmText: 'Your account will be permanently deleted. This action cannot be undone.',
        cancel: 'Cancel',
        confirmDelete: 'Yes, Delete',
        guestMessage: 'Please log in to access these features.',
        passwordMismatch: 'New passwords do not match.',
    };
    
    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = onUpdateProfile(name, phone);
        setProfileMessage({ type: result.success ? 'success' : 'error', text: result.message });
        setTimeout(() => setProfileMessage(null), 3000);
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: t.passwordMismatch });
            return;
        }
        const result = onUpdatePassword(currentPassword, newPassword);
        setPasswordMessage({ type: result.success ? 'success' : 'error', text: result.message });
        if (result.success) {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
        setTimeout(() => setPasswordMessage(null), 3000);
    };

    const handleDeleteConfirm = () => {
        onDeleteAccount();
        setShowDeleteConfirm(false);
    };

    const FormCard: React.FC<{ title: string, children: React.ReactNode, message: typeof profileMessage }> = ({ title, children, message }) => (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-dark mb-4 border-b pb-2">{title}</h3>
            {children}
            {message && (
                <p className={`mt-4 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</p>
            )}
        </div>
    );
    
    return (
        <div className={`p-4 md:p-8 min-h-[calc(100vh-8rem)] bg-gray-100 ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
            <h1 className="text-3xl font-bold text-dark mb-6 text-center">{t.title}</h1>
            
            {isGuest ? (
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
                    <p className="text-gray-600">{t.guestMessage}</p>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Edit Profile Form */}
                        <FormCard title={t.editProfile} message={profileMessage}>
                            <form onSubmit={handleProfileSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">{t.fullName}</label>
                                    <input type="text" id="fullName" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t.phone}</label>
                                    <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">{t.saveChanges}</button>
                            </form>
                        </FormCard>

                        {/* Change Password Form */}
                        <FormCard title={t.changePassword} message={passwordMessage}>
                             <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">{t.currentPassword}</label>
                                    <input type="password" id="currentPassword" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">{t.newPassword}</label>
                                    <input type="password" id="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                 <div>
                                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">{t.confirmNewPassword}</label>
                                    <input type="password" id="confirmNewPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                                </div>
                                <button type="submit" className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary-dark transition-colors">{t.updatePassword}</button>
                            </form>
                        </FormCard>
                    </div>

                    {/* Account Actions */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                         <h3 className="text-xl font-bold text-dark mb-4">{t.deleteAccount}</h3>
                         <div className="flex flex-col sm:flex-row items-center justify-between">
                            <p className="text-gray-600 mb-4 sm:mb-0">{t.deleteConfirmText}</p>
                            <button onClick={() => setShowDeleteConfirm(true)} className="bg-red-600 text-white py-2 px-5 rounded-md hover:bg-red-700 transition-colors whitespace-nowrap">{t.deleteAccount}</button>
                         </div>
                    </div>
                     <button onClick={onLogout} className="w-full mt-4 bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors flex items-center justify-center space-x-2">
                        <LogoutIcon />
                        <span>{t.logout}</span>
                    </button>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" aria-modal="true" role="dialog">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm m-4">
                        <h3 className="text-lg font-bold">{t.deleteConfirmTitle}</h3>
                        <p className="mt-2 text-sm text-gray-600">{t.deleteConfirmText}</p>
                        <div className="mt-6 flex justify-end space-x-3 rtl:space-x-reverse">
                            <button onClick={() => setShowDeleteConfirm(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">{t.cancel}</button>
                            <button onClick={handleDeleteConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">{t.confirmDelete}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileScreen;