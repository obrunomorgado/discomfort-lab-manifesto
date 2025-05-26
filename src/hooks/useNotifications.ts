
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { UserProgress } from '@/types/user';
import { PenaltyContract } from '@/types/penalty';
import { NotificationSettings } from './useNotifications/types';
import { loadNotificationSettings, saveNotificationSettings } from './useNotifications/settings';
import { initializeNotifications } from './useNotifications/initialization';
import {
  scheduleCheckInReminder,
  schedulePenaltyAlert,
  scheduleEmergencyConsultationReminder,
  scheduleDailyMotivation
} from './useNotifications/schedulers';
import { sendTestNotification, cancelAllNotifications } from './useNotifications/actions';

export { NotificationSettings };

export const useNotifications = () => {
  const [isNative, setIsNative] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [settings, setSettings] = useState<NotificationSettings>(loadNotificationSettings());

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
    
    if (Capacitor.isNativePlatform()) {
      initializeNotifications(setPushToken, setPermissionsGranted);
    }
  }, []);

  const saveSettings = (newSettings: NotificationSettings) => {
    setSettings(newSettings);
    saveNotificationSettings(newSettings);
  };

  return {
    isNative,
    permissionsGranted,
    pushToken,
    settings,
    saveSettings,
    scheduleCheckInReminder: (nextCheckInTime: Date) => 
      scheduleCheckInReminder(nextCheckInTime, isNative, settings),
    schedulePenaltyAlert: (contract: PenaltyContract) => 
      schedulePenaltyAlert(contract, isNative, settings),
    scheduleEmergencyConsultationReminder: (progress: UserProgress) => 
      scheduleEmergencyConsultationReminder(progress, isNative, settings),
    scheduleDailyMotivation: () => 
      scheduleDailyMotivation(isNative, settings),
    cancelAllNotifications: () => 
      cancelAllNotifications(isNative),
    sendTestNotification: () => 
      sendTestNotification(isNative)
  };
};
