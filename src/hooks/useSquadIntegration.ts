
import { useEffect } from 'react';
import { useSquad } from './useSquad';
import { useUserProgress } from './useUserProgress';
import { useSoundEffects } from './useSoundEffects';

export const useSquadIntegration = () => {
  const { getSquadByUserId, reportMissionSuccess, reportMissionStart, applySquadPenalty } = useSquad();
  const { progress } = useUserProgress();
  const { playSound } = useSoundEffects();

  const userSquad = getSquadByUserId('current-user');

  // Integrate mission events with squad
  const handleMissionStart = (mission: any) => {
    if (userSquad) {
      reportMissionStart(userSquad.id, progress.username || 'Recruta', mission.title);
    }
  };

  const handleMissionSuccess = (mission: any) => {
    if (userSquad) {
      reportMissionSuccess(userSquad.id, progress.username || 'Recruta', mission.title);
      playSound('squad_bonus');
    }
  };

  const handleMissionFailure = (mission: any) => {
    if (userSquad) {
      applySquadPenalty(userSquad.id, 'current-user', progress.username || 'Recruta');
      playSound('squad_penalty');
    }
  };

  return {
    userSquad,
    handleMissionStart,
    handleMissionSuccess,
    handleMissionFailure,
    isInSquad: !!userSquad
  };
};
