
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.910eff7618c0482da951b3f019cd66bd',
  appName: 'discomfort-lab-manifesto',
  webDir: 'dist',
  server: {
    url: 'https://910eff76-18c0-482d-a951-b3f019cd66bd.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav"
    }
  }
};

export default config;
