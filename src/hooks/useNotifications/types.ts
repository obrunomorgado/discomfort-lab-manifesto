
export interface NotificationSettings {
  checkInReminders: boolean;
  penaltyAlerts: boolean;
  emergencyConsultations: boolean;
  dailyMotivation: boolean;
}

export interface NotificationActionData {
  action: 'open_checkin' | 'open_penalty' | 'open_emergency' | 'test';
}
