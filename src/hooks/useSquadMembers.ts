
import { useState } from 'react';
import { Squad, SquadMember } from '@/types/squad';
import { useSoundEffects } from './useSoundEffects';
import { useSquadStorage } from './useSquadStorage';
import { useSquadNotifications } from './useSquadNotifications';

export const useSquadMembers = (
  squads: Squad[],
  setSquads: (squads: Squad[]) => void
) => {
  const { playSound } = useSoundEffects();
  const { saveSquads, sendChatMessage } = useSquadStorage();
  const { addNotification } = useSquadNotifications();

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
    setSquads(updatedSquads);

    sendChatMessage(newSquad.id, `🏆 Squad "${name}" foi formado! Boa sorte, recrutas!`, 'system');
    playSound('squad_notification');

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
    setSquads(updatedSquads);

    addNotification({
      id: `notif-${Date.now()}`,
      squadId: squad.id,
      type: 'member_joined',
      message: `${username} entrou no squad!`,
      memberUsername: username,
      timestamp: new Date(),
      isRead: false
    });

    sendChatMessage(squad.id, `⚡ ${username} se juntou ao esquadrão! Bem-vindo ao time!`, 'system');
    playSound('squad_member_joined');

    return true;
  };

  const leaveSquad = (squadId: string, userId: string): boolean => {
    const squad = squads.find(s => s.id === squadId);
    if (!squad) return false;

    const member = squad.members.find(m => m.userId === userId);
    if (!member) return false;

    sendChatMessage(squadId, `🔥 ${member.username} abandonou o esquadrão.`, 'system');
    playSound('squad_member_left');

    if (member.isLeader && squad.members.length > 1) {
      const newLeader = squad.members.find(m => m.userId !== userId);
      if (newLeader) {
        newLeader.isLeader = true;
        squad.leaderId = newLeader.userId;
      }
    }

    const updatedSquad = {
      ...squad,
      members: squad.members.filter(m => m.userId !== userId)
    };

    if (updatedSquad.members.length === 0) {
      updatedSquad.isActive = false;
    }

    const updatedSquads = squads.map(s => s.id === squadId ? updatedSquad : s);
    saveSquads(updatedSquads);
    setSquads(updatedSquads);

    return true;
  };

  const getSquadByUserId = (userId: string): Squad | null => {
    return squads.find(s => s.members.some(m => m.userId === userId) && s.isActive) || null;
  };

  return {
    createSquad,
    joinSquad,
    leaveSquad,
    getSquadByUserId
  };
};
