
import { useState, useEffect } from 'react';
import { Squad } from '@/types/squad';
import { useSquadStorage } from './useSquadStorage';
import { useSquadMembers } from './useSquadMembers';
import { useSquadNotifications } from './useSquadNotifications';
import { useSquadMissions } from './useSquadMissions';

const INITIAL_SQUADS: Squad[] = [];

export const useSquad = () => {
  const [squads, setSquads] = useState<Squad[]>(INITIAL_SQUADS);
  const [currentSquad, setCurrentSquad] = useState<Squad | null>(null);
  
  const { loadSquads, loadNotifications } = useSquadStorage();
  const squadNotifications = useSquadNotifications();
  const squadMembers = useSquadMembers(squads, setSquads);
  const squadMissions = useSquadMissions();

  useEffect(() => {
    const loadedSquads = loadSquads();
    setSquads(loadedSquads);

    const loadedNotifications = loadNotifications();
    squadNotifications.loadNotifications(loadedNotifications);
  }, []);

  return {
    squads,
    currentSquad,
    notifications: squadNotifications.notifications,
    createSquad: squadMembers.createSquad,
    joinSquad: squadMembers.joinSquad,
    leaveSquad: squadMembers.leaveSquad,
    applySquadPenalty: squadMissions.applySquadPenalty,
    reportMissionSuccess: squadMissions.reportMissionSuccess,
    reportMissionStart: squadMissions.reportMissionStart,
    getSquadByUserId: squadMembers.getSquadByUserId,
    markNotificationAsRead: squadNotifications.markNotificationAsRead,
    unreadNotifications: squadNotifications.unreadNotifications
  };
};
