
import { Squad, SquadNotification } from '@/types/squad';

export const useSquadStorage = () => {
  const loadSquads = (): Squad[] => {
    const savedSquads = localStorage.getItem('squads');
    if (!savedSquads) return [];
    
    const parsed = JSON.parse(savedSquads);
    return parsed.map((squad: any) => ({
      ...squad,
      createdAt: new Date(squad.createdAt),
      members: squad.members.map((member: any) => ({
        ...member,
        joinedAt: new Date(member.joinedAt),
        lastActivity: new Date(member.lastActivity)
      }))
    }));
  };

  const saveSquads = (squads: Squad[]) => {
    localStorage.setItem('squads', JSON.stringify(squads));
  };

  const loadNotifications = (): SquadNotification[] => {
    const savedNotifications = localStorage.getItem('squadNotifications');
    if (!savedNotifications) return [];
    
    const parsed = JSON.parse(savedNotifications);
    return parsed.map((notif: any) => ({
      ...notif,
      timestamp: new Date(notif.timestamp)
    }));
  };

  const saveNotifications = (notifications: SquadNotification[]) => {
    localStorage.setItem('squadNotifications', JSON.stringify(notifications));
  };

  const sendChatMessage = (squadId: string, message: string, type: 'mission_start' | 'mission_complete' | 'mission_fail' | 'system' = 'system') => {
    const chatMessages = JSON.parse(localStorage.getItem(`squadChat-${squadId}`) || '[]');
    const newMessage = {
      id: `sys-${Date.now()}`,
      squadId,
      userId: 'system',
      username: 'SISTEMA',
      message,
      timestamp: new Date(),
      type
    };
    chatMessages.push(newMessage);
    localStorage.setItem(`squadChat-${squadId}`, JSON.stringify(chatMessages));
  };

  return {
    loadSquads,
    saveSquads,
    loadNotifications,
    saveNotifications,
    sendChatMessage
  };
};
