
import { NotificationSettings } from './types';

export const loadNotificationSettings = (): NotificationSettings => {
  const savedSettings = localStorage.getItem('notification-settings');
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  
  return {
    checkInReminders: true,
    penaltyAlerts: true,
    emergencyConsultations: true,
    dailyMotivation: true
  };
};

export const saveNotificationSettings = (settings: NotificationSettings): void => {
  localStorage.setItem('notification-settings', JSON.stringify(settings));
};
