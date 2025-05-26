
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { handleNotificationAction } from './actions';

export const initializeNotifications = async (
  setPushToken: (token: string) => void,
  setPermissionsGranted: (granted: boolean) => void
) => {
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
