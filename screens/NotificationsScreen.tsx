import React from 'react';
import type { Notification } from '../types';
import { InfoIcon, WarningIcon, ShopIcon } from '../components/Icons';

interface NotificationsScreenProps {
    notifications: Notification[];
    language: 'en' | 'ar';
    onMarkAllRead: () => void;
    onClearAll: () => void;
}

const NotificationIcon: React.FC<{ type: Notification['type'] }> = ({ type }) => {
    const iconProps = { className: "w-6 h-6 text-white" };
    switch (type) {
        case 'info':
            return <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center"><InfoIcon {...iconProps} /></div>;
        case 'alert':
            return <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center"><WarningIcon {...iconProps} /></div>;
        case 'order':
            return <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center"><ShopIcon {...iconProps} /></div>;
        default:
            return null;
    }
};

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ notifications, language, onMarkAllRead, onClearAll }) => {
    const t = language === 'ar' ? {
        title: 'الإشعارات',
        noNotifications: 'لا توجد إشعارات حالياً.',
        markAllRead: 'تحديد الكل كمقروء',
        clearAll: 'مسح الكل'
    } : {
        title: 'Notifications',
        noNotifications: 'You have no notifications.',
        markAllRead: 'Mark All as Read',
        clearAll: 'Clear All'
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

    return (
        <div className={`p-4 md:p-6 min-h-screen bg-gray-100 ${language === 'ar' ? 'font-cairo' : 'font-sans'}`}>
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-dark">{t.title}</h1>
                    {notifications.length > 0 && (
                         <div className="flex space-x-2 rtl:space-x-reverse">
                            <button onClick={onMarkAllRead} className="text-sm font-semibold text-primary hover:underline">{t.markAllRead}</button>
                            <button onClick={onClearAll} className="text-sm font-semibold text-red-500 hover:underline">{t.clearAll}</button>
                        </div>
                    )}
                </div>

                {notifications.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-lg shadow-md">
                        <p className="text-gray-500">{t.noNotifications}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {notifications.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(notification => (
                            <div key={notification.id} className={`p-4 rounded-lg shadow-md flex items-start space-x-4 rtl:space-x-reverse transition-colors ${notification.isRead ? 'bg-white' : 'bg-green-50'}`}>
                                <div className="flex-shrink-0">
                                    <NotificationIcon type={notification.type} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-bold text-dark">{notification.title}</h3>
                                    <p className="text-gray-600 text-sm">{notification.message}</p>
                                    <p className="text-xs text-gray-400 mt-2">{timeSince(notification.createdAt)}</p>
                                </div>
                                {!notification.isRead && <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0 self-center" aria-label="Unread"></div>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsScreen;
