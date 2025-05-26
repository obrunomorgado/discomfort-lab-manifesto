
import { LocalNotifications } from '@capacitor/local-notifications';
import { NotificationActionData } from './types';

export const handleNotificationAction = (data: NotificationActionData) => {
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

export const sendTestNotification = async (isNative: boolean) => {
  if (!isNative) return;

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: '🧪 TESTE DE NOTIFICAÇÃO',
          body: 'Sistema de notificações funcionando perfeitamente!',
          id: 9999,
          schedule: { at: new Date(Date.now() + 1000) },
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

export const cancelAllNotifications = async (isNative: boolean) => {
  if (!isNative) return;

  try {
    await LocalNotifications.cancel({
      notifications: [
        { id: 1001 },
        { id: 2001 },
        { id: 3001 },
        { id: 4001 }
      ]
    });
  } catch (error) {
    console.log('Error canceling notifications:', error);
  }
};
