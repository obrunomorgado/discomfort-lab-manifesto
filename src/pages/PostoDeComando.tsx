
import React from 'react';
import { useUserProgress } from '@/hooks/useUserProgress';
import { usePenaltyContract } from '@/hooks/usePenaltyContract';
import { useSquad } from '@/hooks/useSquad';
import { useSquadIntegration } from '@/hooks/useSquadIntegration';
import { useMissionHandlers } from '@/hooks/useMissionHandlers';
import { useModalStates } from '@/hooks/useModalStates';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useAudioEffects } from '@/hooks/useAudioEffects';
import PostoDeComandoLayout from '@/components/PostoDeComando/PostoDeComandoLayout';
import PostoDeComandoModals from '@/components/PostoDeComando/PostoDeComandoModals';
import MilitaryOnboarding from '@/components/Onboarding/MilitaryOnboarding';

const PostoDeComando = () => {
  const { progress, getStats, getPendingActions } = useUserProgress();
  const { activeContract } = usePenaltyContract();
  const { getSquadByUserId } = useSquad();
  const { userSquad, handleMissionStart, handleMissionSuccess, handleMissionFailure } = useSquadIntegration();
  const { preloadSounds } = useAudioEffects();
  const { showOnboarding, completeOnboarding } = useOnboarding();
  
  const {
    handleMissionSelect,
    handleMissionReport,
    handleDiscomfortAccept,
    handleBettingSelect
  } = useMissionHandlers();
  
  const {
    showPenaltySetup,
    setShowPenaltySetup,
    showPenaltyManagement,
    setShowPenaltyManagement,
    showMissionSelector,
    setShowMissionSelector,
    showDailyReport,
    setShowDailyReport,
    showDiscomfortCard,
    setShowDiscomfortCard,
    showBettingMachine,
    setShowBettingMachine,
    showSquadChat,
    setShowSquadChat
  } = useModalStates();
  
  const stats = getStats();
  const pendingActions = getPendingActions();

  React.useEffect(() => {
    preloadSounds();
  }, [preloadSounds]);

  const handleMissionSelectWithSquad = (mission: any, isDoubled: boolean) => {
    handleMissionSelect(mission, isDoubled);
    handleMissionStart(mission);
    setShowMissionSelector(false);
  };

  const handleMissionReportWithSquad = (success: boolean) => {
    const mission = progress.currentMission;
    const result = handleMissionReport(success);
    
    if (mission) {
      if (success) {
        handleMissionSuccess(mission.selectedMission);
      } else {
        handleMissionFailure(mission.selectedMission);
      }
    }
    
    return result;
  };

  const handleOnboardingComplete = () => {
    completeOnboarding();
  };

  return (
    <>
      <PostoDeComandoLayout
        progress={progress}
        stats={stats}
        pendingActions={pendingActions}
        userSquad={userSquad}
        activeContract={activeContract}
        showSquadChat={showSquadChat}
        setShowSquadChat={setShowSquadChat}
        onMissionSelect={handleMissionSelectWithSquad}
        onShowDailyReport={() => setShowDailyReport(true)}
        onShowMissionSelector={() => setShowMissionSelector(true)}
        onShowBettingMachine={() => setShowBettingMachine(true)}
        onShowPenaltySetup={() => setShowPenaltySetup(true)}
        onShowPenaltyManagement={() => setShowPenaltyManagement(true)}
      />

      <PostoDeComandoModals
        progress={progress}
        showPenaltySetup={showPenaltySetup}
        setShowPenaltySetup={setShowPenaltySetup}
        showPenaltyManagement={showPenaltyManagement}
        setShowPenaltyManagement={setShowPenaltyManagement}
        showDailyReport={showDailyReport}
        setShowDailyReport={setShowDailyReport}
        showDiscomfortCard={showDiscomfortCard}
        setShowDiscomfortCard={setShowDiscomfortCard}
        showBettingMachine={showBettingMachine}
        setShowBettingMachine={setShowBettingMachine}
        onMissionReport={handleMissionReportWithSquad}
        onDiscomfortAccept={handleDiscomfortAccept}
        onBettingSelect={handleBettingSelect}
      />

      <MilitaryOnboarding
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
      />
    </>
  );
};

export default PostoDeComando;
