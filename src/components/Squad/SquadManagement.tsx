
import React from 'react';
import { useSquad } from '@/hooks/useSquad';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useToast } from '@/hooks/use-toast';
import SquadDisplay from './SquadDisplay';
import SquadFormation from './SquadFormation';

const SquadManagement = () => {
  const { progress } = useUserProgress();
  const { currentSquad, createSquad, joinSquad, leaveSquad, getSquadByUserId } = useSquad();
  const { toast } = useToast();

  const userSquad = currentSquad || getSquadByUserId('current-user');

  const handleCreateSquad = async (squadName: string) => {
    try {
      const newSquad = createSquad(squadName, 'current-user', progress.username || 'Recruta');
      toast({
        title: "🏆 SQUAD CRIADO!",
        description: `Squad "${newSquad.name}" foi estabelecido com sucesso!`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao criar squad",
        variant: "destructive"
      });
    }
  };

  const handleJoinSquad = async (inviteCode: string) => {
    try {
      const success = joinSquad(inviteCode, 'current-user', progress.username || 'Recruta');
      if (success) {
        toast({
          title: "🎯 SQUAD CONFIRMADO!",
          description: "Bem-vindo ao esquadrão!",
        });
      } else {
        toast({
          title: "Código inválido",
          description: "Verifique o código do convite ou se o squad não está lotado",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao entrar no squad",
        variant: "destructive"
      });
    }
  };

  const handleLeaveSquad = () => {
    if (!userSquad) return;
    
    const success = leaveSquad(userSquad.id, 'current-user');
    if (success) {
      toast({
        title: "Squad abandonado",
        description: "Você deixou o esquadrão",
        variant: "destructive"
      });
    }
  };

  if (userSquad) {
    const isLeader = userSquad.members.find(m => m.userId === 'current-user')?.isLeader;
    
    return (
      <SquadDisplay 
        squad={userSquad}
        isLeader={!!isLeader}
        onLeaveSquad={handleLeaveSquad}
      />
    );
  }

  return (
    <SquadFormation 
      onCreateSquad={handleCreateSquad}
      onJoinSquad={handleJoinSquad}
    />
  );
};

export default SquadManagement;
