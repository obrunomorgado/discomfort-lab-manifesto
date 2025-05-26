import { useUserProgress } from '@/hooks/useUserProgress';
import { usePenaltyContract } from '@/hooks/usePenaltyContract';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PenaltyStatusChip from '@/components/SkinInTheGame/PenaltyStatusChip';
import PenaltySetupModal from '@/components/SkinInTheGame/PenaltySetupModal';
import PenaltyManagement from '@/components/SkinInTheGame/PenaltyManagement';
import MissionSelector from '@/components/PostoDeComando/MissionSelector';
import DailyReportModal from '@/components/PostoDeComando/DailyReportModal';
import DiscomfortCard from '@/components/PostoDeComando/DiscomfortCard';
import BettingMachine from '@/components/PostoDeComando/BettingMachine';
import CommandHeader from '@/components/PostoDeComando/CommandHeader';
import CombatResources from '@/components/PostoDeComando/CombatResources';
import DrNicotineSection from '@/components/PostoDeComando/DrNicotineSection';
import CombatStatus from '@/components/PostoDeComando/CombatStatus';
import IntelSection from '@/components/PostoDeComando/IntelSection';
import QuickActions from '@/components/PostoDeComando/QuickActions';
import RecruitData from '@/components/PostoDeComando/RecruitData';
import OperationHistory from '@/components/PostoDeComando/OperationHistory';
import OperationSchedule from '@/components/PostoDeComando/OperationSchedule';
import SquadManagement from '@/components/Squad/SquadManagement';
import PotLink from '@/components/Squad/PotLink';

const PostoDeComando = () => {
  const { progress, getStats, getPendingActions, saveProgress, applyMissionResult } = useUserProgress();
  const { activeContract } = usePenaltyContract();
  const { toast } = useToast();
  const [showPenaltySetup, setShowPenaltySetup] = useState(false);
  const [showPenaltyManagement, setShowPenaltyManagement] = useState(false);
  const [showMissionSelector, setShowMissionSelector] = useState(false);
  const [showDailyReport, setShowDailyReport] = useState(false);
  const [showDiscomfortCard, setShowDiscomfortCard] = useState(false);
  const [showBettingMachine, setShowBettingMachine] = useState(false);
  const [showSquadManagement, setShowSquadManagement] = useState(false);
  const [showPotLink, setShowPotLink] = useState(false);
  
  const stats = getStats();
  const pendingActions = getPendingActions();

  const handleMissionSelect = (mission: any, isDoubled: boolean) => {
    const newProgress = { ...progress };
    newProgress.currentMission = {
      selectedMission: mission,
      isDoubled,
      selectedAt: new Date()
    };
    newProgress.lastActivity = new Date();
    saveProgress(newProgress);
    setShowMissionSelector(false);
  };

  const handleMissionReport = (success: boolean) => {
    if (!progress.currentMission) return;

    const newProgress = { ...progress };
    const mission = progress.currentMission;
    
    if (success) {
      const basePoints = mission.selectedMission.basePoints;
      const earnedPoints = mission.isDoubled ? basePoints * 2 : basePoints;
      
      // Aplicar efeito de aposta se ativo
      const finalPoints = progress.currentBettingEffect?.envelope.effect === 'bonus_points' 
        ? Math.floor(earnedPoints * progress.currentBettingEffect.envelope.value)
        : earnedPoints;
      
      newProgress.totalPoints += finalPoints;
      mission.pointsEarned = finalPoints;
      mission.completed = true;
      mission.completedAt = new Date();
    } else {
      const basePenalty = 5;
      let penalty = mission.isDoubled ? basePenalty * 2 : basePenalty;
      
      // Aplicar efeito de aposta se ativo
      if (progress.currentBettingEffect?.envelope.effect === 'penalty_increase') {
        penalty *= progress.currentBettingEffect.envelope.value;
      }
      
      newProgress.credits = Math.max(0, newProgress.credits - penalty);
      mission.penaltyApplied = penalty;
      mission.completed = false;
      mission.completedAt = new Date();
      
      // Adicionar transação de penalidade
      const transaction = {
        id: `mission-penalty-${Date.now()}`,
        type: 'penalty' as const,
        amount: -penalty,
        description: `Falha na missão: ${mission.selectedMission.title}`,
        timestamp: new Date()
      };
      newProgress.creditTransactions.push(transaction);
    }

    // Mover missão para histórico
    newProgress.missionsCompleted.push(mission);
    newProgress.currentMission = undefined;
    newProgress.lastActivity = new Date();
    
    saveProgress(newProgress);
    
    // Aplicar sistema de badges de vergonha
    const { newBadges, removedBadges } = applyMissionResult(mission.selectedMission.id, success);
    
    // Mostrar notificações para badges
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
    setShowDiscomfortCard(false);
  };

  const handleBettingSelect = (envelope: any) => {
    const newProgress = { ...progress };
    newProgress.currentBettingEffect = {
      envelope,
      selectedAt: new Date(),
      isActive: true
    };
    saveProgress(newProgress);
    setShowBettingMachine(false);
  };

  return (
    <div className="min-h-screen bg-military-bg py-8 px-4 scanline-overlay">
      <div className="max-w-7xl mx-auto">
        {/* Military Command Header */}
        <CommandHeader progress={progress} pendingActionsCount={pendingActions.length} />

        {/* Main Content */}
        <div className="bg-military-card rounded-lg border-2 border-cyber-fuchsia/30 shadow-2xl mb-8 cyber-glow rivet-border">
          {/* Combat Resources */}
          <CombatResources progress={progress} stats={stats} />

          {/* Dr. Nicotine Communication */}
          <DrNicotineSection progress={progress} pendingActions={pendingActions} />

          {/* Penalty Status */}
          <div className="p-6 border-b border-military-border">
            <PenaltyStatusChip 
              contract={activeContract}
              onManage={() => setShowPenaltyManagement(true)}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Combat Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mission Selector */}
            {!progress.currentMission && (
              <MissionSelector 
                onMissionSelect={handleMissionSelect}
                selectedMission={progress.currentMission?.selectedMission}
                isDoubled={progress.currentMission?.isDoubled}
              />
            )}

            {/* Combat Status */}
            <CombatStatus 
              progress={progress} 
              pendingActions={pendingActions} 
              onShowDailyReport={() => setShowDailyReport(true)} 
            />

            {/* Intel de Missão */}
            <IntelSection progress={progress} stats={stats} />

            {/* Squad Management */}
            <SquadManagement />

            {/* Ordens Imediatas */}
            <QuickActions
              progress={progress}
              activeContract={activeContract}
              onShowMissionSelector={() => setShowMissionSelector(true)}
              onShowDailyReport={() => setShowDailyReport(true)}
              onShowBettingMachine={() => setShowBettingMachine(true)}
              onShowPenaltySetup={() => setShowPenaltySetup(true)}
              onShowPenaltyManagement={() => setShowPenaltyManagement(true)}
            />
          </div>

          {/* Right Column - Recruta Data */}
          <div className="space-y-6">
            {/* Dados do Recruta */}
            <RecruitData progress={progress} />

            {/* Link do Pot */}
            <PotLink />

            {/* Histórico de Operações */}
            <OperationHistory progress={progress} />

            {/* Agenda de Operações */}
            <OperationSchedule progress={progress} pendingActions={pendingActions} />
          </div>
        </div>

        {/* Modals */}
        <PenaltySetupModal 
          isOpen={showPenaltySetup}
          onClose={() => setShowPenaltySetup(false)}
        />

        <DailyReportModal 
          isOpen={showDailyReport}
          onClose={() => setShowDailyReport(false)}
          mission={progress.currentMission}
          onReport={handleMissionReport}
        />

        <DiscomfortCard 
          onAccept={handleDiscomfortAccept}
          onDismiss={() => setShowDiscomfortCard(false)}
        />

        <BettingMachine 
          isOpen={showBettingMachine}
          onClose={() => setShowBettingMachine(false)}
          onEnvelopeSelect={handleBettingSelect}
        />

        {/* Penalty Management Modal */}
        {showPenaltyManagement && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-military-card border border-cyber-fuchsia/30 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-auto rivet-border">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bebas text-cyber-fuchsia">GERENCIAR PENALIDADES</h2>
                  <Button 
                    onClick={() => setShowPenaltyManagement(false)}
                    variant="outline"
                    size="sm"
                    className="border-military-border text-warm-gray hover:bg-military-border/20"
                  >
                    FECHAR
                  </Button>
                </div>
                <PenaltyManagement />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostoDeComando;
