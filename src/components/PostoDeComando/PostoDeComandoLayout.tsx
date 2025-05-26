
import React from 'react';
import { UserProgress, DailyAction } from '@/types/user';
import { Squad } from '@/types/squad';
import { PenaltyContract } from '@/types/penalty';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import CommandHeader from '@/components/PostoDeComando/CommandHeader';
import DrNicotineSection from '@/components/PostoDeComando/DrNicotineSection';
import PenaltyStatusChip from '@/components/SkinInTheGame/PenaltyStatusChip';
import OverviewCard from '@/components/PostoDeComando/OverviewCard';
import ProgressCard from '@/components/PostoDeComando/ProgressCard';
import ActionsCard from '@/components/PostoDeComando/ActionsCard';
import AdvancedFeaturesAccordion from '@/components/PostoDeComando/AdvancedFeaturesAccordion';
import RecruitData from '@/components/PostoDeComando/RecruitData';
import OperationHistory from '@/components/PostoDeComando/OperationHistory';
import SquadChat from '@/components/Squad/SquadChat';
import { useNativeFeatures } from '@/hooks/useNativeFeatures';

interface PostoDeComandoLayoutProps {
  progress: UserProgress;
  stats: any;
  pendingActions: DailyAction[];
  userSquad: Squad | null;
  activeContract: PenaltyContract | null;
  showSquadChat: boolean;
  setShowSquadChat: (show: boolean) => void;
  onMissionSelect: (mission: any, isDoubled: boolean) => void;
  onShowDailyReport: () => void;
  onShowMissionSelector: () => void;
  onShowBettingMachine: () => void;
  onShowPenaltySetup: () => void;
  onShowPenaltyManagement: () => void;
  onStartTour?: () => void;
  onRefresh?: () => void;
}

const PostoDeComandoLayout = ({
  progress,
  stats,
  pendingActions,
  userSquad,
  activeContract,
  showSquadChat,
  setShowSquadChat,
  onMissionSelect,
  onShowDailyReport,
  onShowMissionSelector,
  onShowBettingMachine,
  onShowPenaltySetup,
  onShowPenaltyManagement,
  onStartTour,
  onRefresh
}: PostoDeComandoLayoutProps) => {
  const { triggerHaptic } = useNativeFeatures();

  const handleRefresh = async () => {
    await triggerHaptic();
    onRefresh?.();
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} className="min-h-screen bg-military-bg">
      <div className="py-8 px-4 scanline-overlay">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <CommandHeader 
            progress={progress} 
            pendingActionsCount={pendingActions.length}
            onStartTour={onStartTour}
          />

          {/* Dr. Nicotine Section */}
          <div className="card-base">
            <DrNicotineSection progress={progress} pendingActions={pendingActions} />
            
            <div className="px-6 pb-6">
              <PenaltyStatusChip 
                contract={activeContract}
                onManage={onShowPenaltyManagement}
              />
            </div>
          </div>

          {/* Main Dashboard - Primary Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <OverviewCard 
              progress={progress}
              onShowMissionSelector={onShowMissionSelector}
              onShowDailyReport={onShowDailyReport}
            />
            
            <ProgressCard 
              progress={progress}
              stats={stats}
            />
            
            <ActionsCard 
              activeContract={activeContract}
              onShowBettingMachine={onShowBettingMachine}
              onShowPenaltySetup={onShowPenaltySetup}
              onShowPenaltyManagement={onShowPenaltyManagement}
            />
          </div>

          {/* Secondary Content */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <AdvancedFeaturesAccordion userSquad={userSquad} />
            </div>
            
            <div className="space-y-6">
              <RecruitData progress={progress} />
              <OperationHistory progress={progress} />
            </div>
          </div>

          {/* Squad Chat - Always available when user has a squad */}
          {userSquad && (
            <SquadChat 
              squadId={userSquad.id}
              isOpen={showSquadChat}
              onToggle={() => setShowSquadChat(!showSquadChat)}
            />
          )}
        </div>
      </div>
    </PullToRefresh>
  );
};

export default PostoDeComandoLayout;
