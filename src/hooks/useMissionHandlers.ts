
import { useState } from 'react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { useSquad } from '@/hooks/useSquad';
import { useSoundEffects } from '@/hooks/useSoundEffects';
import { useToast } from '@/hooks/use-toast';

export const useMissionHandlers = () => {
  const { progress, saveProgress, applyMissionResult } = useUserProgress();
  const { getSquadByUserId, reportMissionSuccess, reportMissionStart, applySquadPenalty } = useSquad();
  const { playSound } = useSoundEffects();
  const { toast } = useToast();

  const userSquad = getSquadByUserId('current-user');

  const handleMissionSelect = (mission: any, isDoubled: boolean) => {
    const newProgress = { ...progress };
    newProgress.currentMission = {
      selectedMission: mission,
      isDoubled,
      selectedAt: new Date()
    };
    newProgress.lastActivity = new Date();
    saveProgress(newProgress);

    playSound('button_click');

    if (userSquad) {
      reportMissionStart(userSquad.id, progress.username || 'Recruta', mission.title);
    }
  };

  const handleMissionReport = (success: boolean) => {
    if (!progress.currentMission) return;

    const newProgress = { ...progress };
    const mission = progress.currentMission;
    
    if (success) {
      const basePoints = mission.selectedMission.basePoints;
      let earnedPoints = mission.isDoubled ? basePoints * 2 : basePoints;
      
      // Apply squad XP multiplier if in a squad
      if (userSquad) {
        earnedPoints = Math.floor(earnedPoints * userSquad.xpMultiplier);
      }
      
      const finalPoints = progress.currentBettingEffect?.envelope.effect === 'bonus_points' 
        ? Math.floor(earnedPoints * progress.currentBettingEffect.envelope.value)
        : earnedPoints;
      
      newProgress.totalPoints += finalPoints;
      mission.pointsEarned = finalPoints;
      mission.completed = true;
      mission.completedAt = new Date();

      playSound('mission_success');
      setTimeout(() => playSound('xp_gained'), 500);

      if (userSquad) {
        reportMissionSuccess(userSquad.id, progress.username || 'Recruta', mission.selectedMission.title);
        
        toast({
          title: "🎯 MISSÃO COMPLETA!",
          description: `+${Math.round((userSquad.xpMultiplier - 1) * 100)}% XP bônus do squad aplicado!`,
        });
      }
    } else {
      const basePenalty = 5;
      let penalty = mission.isDoubled ? basePenalty * 2 : basePenalty;
      
      if (progress.currentBettingEffect?.envelope.effect === 'penalty_increase') {
        penalty *= progress.currentBettingEffect.envelope.value;
      }
      
      newProgress.credits = Math.max(0, newProgress.credits - penalty);
      mission.penaltyApplied = penalty;
      mission.completed = false;
      mission.completedAt = new Date();
      
      playSound('mission_failure');
      setTimeout(() => playSound('penalty_applied'), 700);
      
      const transaction = {
        id: `mission-penalty-${Date.now()}`,
        type: 'penalty' as const,
        amount: -penalty,
        description: `Falha na missão: ${mission.selectedMission.title}`,
        timestamp: new Date()
      };
      newProgress.creditTransactions.push(transaction);

      // Apply squad penalty if in a squad
      if (userSquad) {
        applySquadPenalty(userSquad.id, 'current-user', progress.username || 'Recruta');
        
        toast({
          title: "💥 FALHA CRÍTICA!",
          description: "Squad perdeu 20% do XP. Todos os membros foram penalizados.",
          variant: "destructive"
        });
      }
    }

    newProgress.missionsCompleted.push(mission);
    newProgress.currentMission = undefined;
    newProgress.lastActivity = new Date();
    
    saveProgress(newProgress);
    
    const { newBadges, removedBadges } = applyMissionResult(mission.selectedMission.id, success);
    
    if (newBadges.length > 0) {
      newBadges.forEach(badge => {
        if (badge.id === 'shame-duck') {
          toast({
            title: "🐥 BADGE DE VERGONHA APLICADO!",
            description: "3 falhas consecutivas. Complete uma missão para redenção.",
            variant: "destructive"
          });
        } else {
          toast({
            title: `🏆 Badge Desbloqueado!`,
            description: `${badge.name}: ${badge.description}`,
          });
        }
      });
    }
    
    if (removedBadges.length > 0) {
      removedBadges.forEach(badgeId => {
        if (badgeId === 'shame-duck') {
          toast({
            title: "🎉 REDENÇÃO CONQUISTADA!",
            description: "Badge de Vergonha removido com sucesso!",
          });
        }
      });
    }
  };

  const handleDiscomfortAccept = (card: any) => {
    const newProgress = { ...progress };
    newProgress.currentDiscomfortChallenge = {
      card,
      acceptedAt: new Date()
    };
    saveProgress(newProgress);
    playSound('button_click');
  };

  const handleBettingSelect = (envelope: any) => {
    const newProgress = { ...progress };
    newProgress.currentBettingEffect = {
      envelope,
      selectedAt: new Date(),
      isActive: true
    };
    saveProgress(newProgress);
    playSound('button_click');
  };

  return {
    handleMissionSelect,
    handleMissionReport,
    handleDiscomfortAccept,
    handleBettingSelect
  };
};
