
import { useSoundEffects } from './useSoundEffects';
import { useSquadStorage } from './useSquadStorage';
import { useSquadNotifications } from './useSquadNotifications';

export const useSquadMissions = () => {
  const { playSound } = useSoundEffects();
  const { sendChatMessage } = useSquadStorage();
  const { addNotification } = useSquadNotifications();

  const applySquadPenalty = (squadId: string, failedUserId: string, failedUsername: string) => {
    addNotification({
      id: `notif-${Date.now()}`,
      squadId,
      type: 'xp_penalty',
      message: `${failedUsername} falhou na missão. Squad perdeu 20% do XP.`,
      memberUsername: failedUsername,
      timestamp: new Date(),
      isRead: false
    });

    sendChatMessage(squadId, `💥 ${failedUsername} falhou na missão! Todos perdem 20% do XP. Mantenham o foco!`, 'mission_fail');
    playSound('penalty_applied');
  };

  const reportMissionSuccess = (squadId: string, username: string, missionName: string) => {
    sendChatMessage(squadId, `🎯 ${username} completou a missão "${missionName}"! +20% XP para todos!`, 'mission_complete');
    playSound('mission_success');
  };

  const reportMissionStart = (squadId: string, username: string, missionName: string) => {
    sendChatMessage(squadId, `🔥 ${username} iniciou a missão "${missionName}". Boa sorte!`, 'mission_start');
    playSound('squad_notification');
  };

  return {
    applySquadPenalty,
    reportMissionSuccess,
    reportMissionStart
  };
};
