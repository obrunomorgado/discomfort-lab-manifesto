
import { LocalNotifications } from '@capacitor/local-notifications';
import { PenaltyContract } from '@/types/penalty';
import { UserProgress } from '@/types/user';
import { NotificationSettings } from './types';

export const scheduleCheckInReminder = async (
  nextCheckInTime: Date,
  isNative: boolean,
  settings: NotificationSettings
) => {
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

export const schedulePenaltyAlert = async (
  contract: PenaltyContract,
  isNative: boolean,
  settings: NotificationSettings
) => {
  if (!isNative || !settings.penaltyAlerts) return;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(8, 0, 0, 0);

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

export const scheduleEmergencyConsultationReminder = async (
  progress: UserProgress,
  isNative: boolean,
  settings: NotificationSettings
) => {
  if (!isNative || !settings.emergencyConsultations) return;

  const treatmentDays = progress.treatmentStartDate ? 
    Math.floor((new Date().getTime() - progress.treatmentStartDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  if (treatmentDays > 7 && progress.debtPoints > 30) {
    const reminderTime = new Date();
    reminderTime.setHours(reminderTime.getHours() + 2);

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

export const scheduleDailyMotivation = async (
  isNative: boolean,
  settings: NotificationSettings
) => {
  if (!isNative || !settings.dailyMotivation) return;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(7, 0, 0, 0);

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
