
import { useState } from 'react';
import { SquadNotification } from '@/types/squad';
import { useSquadStorage } from './useSquadStorage';

export const useSquadNotifications = () => {
  const [notifications, setNotifications] = useState<SquadNotification[]>([]);
  const { saveNotifications } = useSquadStorage();

  const addNotification = (notification: SquadNotification) => {
    const updatedNotifications = [...notifications, notification];
    setNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);
  };

  const markNotificationAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    );
    setNotifications(updatedNotifications);
    saveNotifications(updatedNotifications);
  };

  const loadNotifications = (loadedNotifications: SquadNotification[]) => {
    setNotifications(loadedNotifications);
  };

  return {
    notifications,
    addNotification,
    markNotificationAsRead,
    loadNotifications,
    unreadNotifications: notifications.filter(n => !n.isRead).length
  };
};
