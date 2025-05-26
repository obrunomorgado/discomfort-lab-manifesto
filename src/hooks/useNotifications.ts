
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { UserProgress } from '@/types/user';
import { PenaltyContract } from '@/types/penalty';

export interface NotificationSettings {
  checkInReminders: boolean;
  penaltyAlerts: boolean;
  emergencyConsultations: boolean;
  dailyMotivation: boolean;
}

export const useNotifications = () => {
  const [isNative, setIsNative] = useState(false);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [settings, setSettings] = useState<NotificationSettings>({
    checkInReminders: true,
    penaltyAlerts: true,
    emergencyConsultations: true,
    dailyMotivation: true
  });

  useEffect(() => {
    setIsNative(Capacitor.isNativePlatform());
    
    if (Capacitor.isNativePlatform()) {
      initializeNotifications();
      loadSettings();
    }
  }, []);

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('notification-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const saveSettings = (newSettings: NotificationSettings) => {
    setSettings(newSettings);
    localStorage.setItem('notification-settings', JSON.stringify(newSettings));
  };

  const initializeNotifications = async () => {
    try {
      // Request permission for push notifications
      const result = await PushNotifications.requestPermissions();
      if (result.receive === 'granted') {
        await PushNotifications.register();
        
        // Listen for registration
        PushNotifications.addListener('registration', (token) => {
          console.log('Push registration success, token: ' + token.value);
          setPushToken(token.value);
          setPermissionsGranted(true);
        });

        // Listen for push notifications
        PushNotifications.addListener('pushNotificationReceived', (notification) => {
          console.log('Push received: ', notification);
        });

        // Listen for notification actions
        PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
          console.log('Push action performed: ', notification);
          handleNotificationAction(notification.notification.data);
        });
      }

      // Request permission for local notifications
      await LocalNotifications.requestPermissions();
      
      // Listen for local notification actions
      LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
        handleNotificationAction(notification.notification.extra);
      });

    } catch (error) {
      console.log('Error initializing notifications:', error);
    }
  };

  const handleNotificationAction = (data: any) => {
    if (data.action) {
      switch (data.action) {
        case 'open_checkin':
          window.location.href = '/career-truth-ai';
          break;
        case 'open_penalty':
          window.location.href = '/posto-de-comando';
          break;
        case 'open_emergency':
          window.location.href = '/career-truth-ai';
          break;
      }
    }
  };

  const scheduleCheckInReminder = async (nextCheckInTime: Date) => {
    if (!isNative || !settings.checkInReminders) return;

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: '🎯 SALA DO DESCONFORTO',
            body: 'Hora do check-in diário, soldado! Dr. Desculpas está esperando.',
            id: 1001,
            schedule: { at: nextCheckInTime },
            sound: 'beep.wav',
            attachments: [],
            actionTypeId: '',
            extra: { action: 'open_checkin' }
          }
        ]
      });
    } catch (error) {
      console.log('Error scheduling check-in reminder:', error);
    }
  };

  const schedulePenaltyAlert = async (contract: PenaltyContract) => {
    if (!isNative || !settings.penaltyAlerts) return;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(8, 0, 0, 0); // 8 AM

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: '💸 PENALIDADE ATIVA',
            body: `Sua tarefa diária: "${contract.daily_task}". Falha = R$ ${(contract.penalty_amount / 100).toFixed(2)}`,
            id: 2001,
            schedule: { at: tomorrow },
            sound: 'beep.wav',
            attachments: [],
            actionTypeId: '',
            extra: { action: 'open_penalty' }
          }
        ]
      });
    } catch (error) {
      console.log('Error scheduling penalty alert:', error);
    }
  };

  const scheduleEmergencyConsultationReminder = async (progress: UserProgress) => {
    if (!isNative || !settings.emergencyConsultations) return;

    // Se está em tratamento há mais de 7 dias sem progresso
    const treatmentDays = progress.treatmentStartDate ? 
      Math.floor((new Date().getTime() - progress.treatmentStartDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;

    if (treatmentDays > 7 && progress.debtPoints > 30) {
      const reminderTime = new Date();
      reminderTime.setHours(reminderTime.getHours() + 2); // 2 horas a partir de agora

      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: '🚨 CONSULTA DE EMERGÊNCIA',
              body: `Sua dívida está alta (${progress.debtPoints} pontos). Considere uma consulta de emergência.`,
              id: 3001,
              schedule: { at: reminderTime },
              sound: 'beep.wav',
              attachments: [],
              actionTypeId: '',
              extra: { action: 'open_emergency' }
            }
          ]
        });
      } catch (error) {
        console.log('Error scheduling emergency reminder:', error);
      }
    }
  };

  const scheduleDailyMotivation = async () => {
    if (!isNative || !settings.dailyMotivation) return;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(7, 0, 0, 0); // 7 AM

    const motivationalMessages = [
      '💪 A única pessoa que pode te sabotar hoje é você mesmo. Não deixe.',
      '🔥 Sua zona de conforto é o túmulo dos seus sonhos. Saia dela!',
      '⚔️ Cada desculpa que você não usa é uma vitória conquistada.',
      '🎯 Dr. Desculpas está de plantão. Que tal não dar trabalho para ele hoje?',
      '🚀 Sua recuperação depende das suas ações. Escolha bem.'
    ];

    const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: '🌅 BOM DIA, SOLDADO!',
            body: randomMessage,
            id: 4001,
            schedule: { at: tomorrow },
            sound: 'beep.wav',
            attachments: [],
            actionTypeId: '',
            extra: { action: 'open_checkin' }
          }
        ]
      });
    } catch (error) {
      console.log('Error scheduling daily motivation:', error);
    }
  };

  const cancelAllNotifications = async () => {
    if (!isNative) return;

    try {
      await LocalNotifications.cancel({
        notifications: [
          { id: '1001' },
          { id: '2001' },
          { id: '3001' },
          { id: '4001' }
        ]
      });
    } catch (error) {
      console.log('Error canceling notifications:', error);
    }
  };

  const sendTestNotification = async () => {
    if (!isNative) return;

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: '🧪 TESTE DE NOTIFICAÇÃO',
            body: 'Sistema de notificações funcionando perfeitamente!',
            id: 9999,
            schedule: { at: new Date(Date.now() + 1000) }, // 1 segundo
            sound: 'beep.wav',
            attachments: [],
            actionTypeId: '',
            extra: { action: 'test' }
          }
        ]
      });
    } catch (error) {
      console.log('Error sending test notification:', error);
    }
  };

  return {
    isNative,
    permissionsGranted,
    pushToken,
    settings,
    saveSettings,
    scheduleCheckInReminder,
    schedulePenaltyAlert,
    scheduleEmergencyConsultationReminder,
    scheduleDailyMotivation,
    cancelAllNotifications,
    sendTestNotification
  };
};
