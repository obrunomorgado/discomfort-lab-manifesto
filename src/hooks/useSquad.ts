
import { useState, useEffect } from 'react';
import { Squad, SquadMember, SquadInvite, SquadNotification } from '@/types/squad';

const INITIAL_SQUADS: Squad[] = [];

export const useSquad = () => {
  const [squads, setSquads] = useState<Squad[]>(INITIAL_SQUADS);
  const [currentSquad, setCurrentSquad] = useState<Squad | null>(null);
  const [notifications, setNotifications] = useState<SquadNotification[]>([]);

  useEffect(() => {
    const savedSquads = localStorage.getItem('squads');
    if (savedSquads) {
      const parsed = JSON.parse(savedSquads);
      setSquads(parsed.map((squad: any) => ({
        ...squad,
        createdAt: new Date(squad.createdAt),
        members: squad.members.map((member: any) => ({
          ...member,
          joinedAt: new Date(member.joinedAt),
          lastActivity: new Date(member.lastActivity)
        }))
      })));
    }

    const savedNotifications = localStorage.getItem('squadNotifications');
    if (savedNotifications) {
      const parsed = JSON.parse(savedNotifications);
      setNotifications(parsed.map((notif: any) => ({
        ...notif,
        timestamp: new Date(notif.timestamp)
      })));
    }
  }, []);

  const saveSquads = (newSquads: Squad[]) => {
    setSquads(newSquads);
    localStorage.setItem('squads', JSON.stringify(newSquads));
  };

  const saveNotifications = (newNotifications: SquadNotification[]) => {
    setNotifications(newNotifications);
    localStorage.setItem('squadNotifications', JSON.stringify(newNotifications));
  };

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createSquad = (name: string, userId: string, username: string): Squad => {
    const newSquad: Squad = {
      id: `squad-${Date.now()}`,
      name,
      leaderId: userId,
      members: [{
        userId,
        username,
        level: 1,
        totalPoints: 0,
        joinedAt: new Date(),
        isLeader: true,
        status: 'active',
        lastActivity: new Date()
      }],
      createdAt: new Date(),
      xpMultiplier: 1.2,
      isActive: true,
      inviteCode: generateInviteCode()
    };

    const updatedSquads = [...squads, newSquad];
    saveSquads(updatedSquads);
    setCurrentSquad(newSquad);
    return newSquad;
  };

  const joinSquad = (inviteCode: string, userId: string, username: string): boolean => {
    const squad = squads.find(s => s.inviteCode === inviteCode && s.isActive);
    if (!squad || squad.members.length >= 3) {
      return false;
    }

    const updatedSquad = {
      ...squad,
      members: [...squad.members, {
        userId,
        username,
        level: 1,
        totalPoints: 0,
        joinedAt: new Date(),
        isLeader: false,
        status: 'active' as const,
        lastActivity: new Date()
      }]
    };

    const updatedSquads = squads.map(s => s.id === squad.id ? updatedSquad : s);
    saveSquads(updatedSquads);
    setCurrentSquad(updatedSquad);

    // Adicionar notificação
    const notification: SquadNotification = {
      id: `notif-${Date.now()}`,
      squadId: squad.id,
      type: 'member_joined',
      message: `${username} entrou no squad!`,
      memberUsername: username,
      timestamp: new Date(),
      isRead: false
    };

    saveNotifications([...notifications, notification]);
    return true;
  };

  const leaveSquad = (squadId: string, userId: string): boolean => {
    const squad = squads.find(s => s.id === squadId);
    if (!squad) return false;

    const member = squad.members.find(m => m.userId === userId);
    if (!member) return false;

    // Se é o líder e há outros membros, transferir liderança
    if (member.isLeader && squad.members.length > 1) {
      const newLeader = squad.members.find(m => m.userId !== userId);
      if (newLeader) {
        newLeader.isLeader = true;
        squad.leaderId = newLeader.userId;
      }
    }

    // Remover membro
    const updatedSquad = {
      ...squad,
      members: squad.members.filter(m => m.userId !== userId)
    };

    // Se não há mais membros, desativar squad
    if (updatedSquad.members.length === 0) {
      updatedSquad.isActive = false;
    }

    const updatedSquads = squads.map(s => s.id === squadId ? updatedSquad : s);
    saveSquads(updatedSquads);

    if (userId === member.userId) {
      setCurrentSquad(null);
    }

    return true;
  };

  const applySquadPenalty = (squadId: string, failedUserId: string, failedUsername: string) => {
    const squad = squads.find(s => s.id === squadId);
    if (!squad) return;

    // Todos os membros perdem 20% do XP
    const notification: SquadNotification = {
      id: `notif-${Date.now()}`,
      squadId,
      type: 'xp_penalty',
      message: `${failedUsername} falhou na missão. Squad perdeu 20% do XP.`,
      memberUsername: failedUsername,
      timestamp: new Date(),
      isRead: false
    };

    saveNotifications([...notifications, notification]);
  };

  const getSquadByUserId = (userId: string): Squad | null => {
    return squads.find(s => s.members.some(m => m.userId === userId) && s.isActive) || null;
  };

  const markNotificationAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map(n => 
      n.id === notificationId ? { ...n, isRead: true } : n
    );
    saveNotifications(updatedNotifications);
  };

  return {
    squads,
    currentSquad,
    notifications,
    createSquad,
    joinSquad,
    leaveSquad,
    applySquadPenalty,
    getSquadByUserId,
    markNotificationAsRead,
    unreadNotifications: notifications.filter(n => !n.isRead).length
  };
};
