import React from 'react';
import { UserProgress, DailyAction } from '@/types/user';
import { Squad } from '@/types/squad';
import { PenaltyContract } from '@/types/penalty';
import CommandHeader from '@/components/PostoDeComando/CommandHeader';
import CombatResources from '@/components/PostoDeComando/CombatResources';
import DrNicotineSection from '@/components/PostoDeComando/DrNicotineSection';
import PenaltyStatusChip from '@/components/SkinInTheGame/PenaltyStatusChip';
import MissionSelector from '@/components/PostoDeComando/MissionSelector';
import CombatStatus from '@/components/PostoDeComando/CombatStatus';
import IntelSection from '@/components/PostoDeComando/IntelSection';
import SquadManagement from '@/components/Squad/SquadManagement';
import SquadNotifications from '@/components/Squad/SquadNotifications';
import HonorLog from '@/components/Squad/HonorLog';
import QuickActions from '@/components/PostoDeComando/QuickActions';
import RecruitData from '@/components/PostoDeComando/RecruitData';
import PotLink from '@/components/Squad/PotLink';
import OperationHistory from '@/components/PostoDeComando/OperationHistory';
import OperationSchedule from '@/components/PostoDeComando/OperationSchedule';
import SquadChat from '@/components/Squad/SquadChat';
import StreamDaVergonha from '@/components/Squad/StreamDaVergonha';
import StickerSystem from '@/components/Squad/StickerSystem';
import Desafio72h from '@/components/Squad/Desafio72h';
import QRRoletaDor from '@/components/Squad/QRRoletaDor';
import ApadrinhaMeuDesafio from '@/components/Squad/ApadrinhaMeuDesafio';
import DiscordMuroLamentacao from '@/components/Squad/DiscordMuroLamentacao';

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
  onShowPenaltyManagement
}: PostoDeComandoLayoutProps) => {
  return (
    <div className="min-h-screen bg-military-bg py-8 px-4 scanline-overlay">
      <div className="max-w-7xl mx-auto">
        <CommandHeader progress={progress} pendingActionsCount={pendingActions.length} />

        <div className="bg-military-card rounded-lg border-2 border-cyber-fuchsia/30 shadow-2xl mb-8 cyber-glow rivet-border">
          <CombatResources progress={progress} stats={stats} />
          <DrNicotineSection progress={progress} pendingActions={pendingActions} />
          
          <div className="p-6 border-b border-military-border">
            <PenaltyStatusChip 
              contract={activeContract}
              onManage={onShowPenaltyManagement}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {!progress.currentMission && (
              <MissionSelector 
                onMissionSelect={onMissionSelect}
                selectedMission={progress.currentMission?.selectedMission}
                isDoubled={progress.currentMission?.isDoubled}
              />
            )}

            <CombatStatus 
              progress={progress} 
              pendingActions={pendingActions} 
              onShowDailyReport={onShowDailyReport} 
            />

            <IntelSection progress={progress} stats={stats} />
            
            {/* Squad Section - Now prominently displayed */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <SquadManagement />
                {userSquad && <SquadNotifications />}
              </div>
              
              {/* Show HonorLog and PotLink when user has a squad */}
              {userSquad && (
                <div className="grid md:grid-cols-2 gap-6">
                  <HonorLog />
                  <PotLink />
                </div>
              )}

              {/* Advanced Features Section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bebas text-cyber-fuchsia cyber-glow mb-4">
                  🔥 ADVANCED FEATURES
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <StreamDaVergonha />
                  <StickerSystem />
                </div>
                
                <Desafio72h />

                {/* FASE 2: External Integrations & QR System */}
                <h2 className="text-2xl font-bebas text-red-400 cyber-glow mb-4">
                  ⚡ EXTERNAL INTEGRATIONS
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <QRRoletaDor />
                  <ApadrinhaMeuDesafio />
                </div>
                
                <DiscordMuroLamentacao />
              </div>
            </div>

            <QuickActions
              progress={progress}
              activeContract={activeContract}
              onShowMissionSelector={onShowMissionSelector}
              onShowDailyReport={onShowDailyReport}
              onShowBettingMachine={onShowBettingMachine}
              onShowPenaltySetup={onShowPenaltySetup}
              onShowPenaltyManagement={onShowPenaltyManagement}
            />
          </div>

          <div className="space-y-6">
            <RecruitData progress={progress} />
            {/* Move standalone PotLink here if user doesn't have squad */}
            {!userSquad && <PotLink />}
            <OperationHistory progress={progress} />
            <OperationSchedule progress={progress} pendingActions={pendingActions} />
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
  );
};

export default PostoDeComandoLayout;
