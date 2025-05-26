
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';

export const useNativeFeatures = () => {
  const [isNative, setIsNative] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
    
    if (Capacitor.isNativePlatform()) {
      initializeNotifications();
    }
  }, []);

  const initializeNotifications = async () => {
    try {
      // Request permission to use push notifications
      const result = await PushNotifications.requestPermissions();
      if (result.receive === 'granted') {
        await PushNotifications.register();
        setPermissionsGranted(true);
      }

      // Request permission for local notifications
      await LocalNotifications.requestPermissions();
    } catch (error) {
      console.log('Error initializing notifications:', error);
    }
  };

  const triggerHaptic = async (style: ImpactStyle = ImpactStyle.Light) => {
    if (isNative) {
      try {
        await Haptics.impact({ style });
      } catch (error) {
        console.log('Haptic feedback not available:', error);
      }
    }
  };

  const scheduleReminder = async (title: string, body: string, delay: number) => {
    if (isNative) {
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              title,
              body,
              id: Date.now(),
              schedule: { at: new Date(Date.now() + delay) },
              sound: 'beep.wav',
              attachments: [],
              actionTypeId: '',
              extra: {}
            }
          ]
        });
      } catch (error) {
        console.log('Error scheduling notification:', error);
      }
    }
  };

  const scheduleDailyCheckIn = async () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0); // 9 AM

    await scheduleReminder(
      '🎯 SALA DO DESCONFORTO',
      'Hora do check-in diário, soldado! Não deixe o Dr. Desculpas esperando.',
      tomorrow.getTime() - Date.now()
    );
  };

  return {
    isNative,
    permissionsGranted,
    triggerHaptic,
    scheduleReminder,
    scheduleDailyCheckIn
  };
};
