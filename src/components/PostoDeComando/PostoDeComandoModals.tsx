
import React from 'react';
import { Button } from '@/components/ui/button';
import PenaltySetupModal from '@/components/SkinInTheGame/PenaltySetupModal';
import PenaltyManagement from '@/components/SkinInTheGame/PenaltyManagement';
import DailyReportModal from '@/components/PostoDeComando/DailyReportModal';
import DiscomfortCard from '@/components/PostoDeComando/DiscomfortCard';
import BettingMachine from '@/components/PostoDeComando/BettingMachine';
import { UserProgress } from '@/types/user';

interface PostoDeComandoModalsProps {
  progress: UserProgress;
  showPenaltySetup: boolean;
  setShowPenaltySetup: (show: boolean) => void;
  showPenaltyManagement: boolean;
  setShowPenaltyManagement: (show: boolean) => void;
  showDailyReport: boolean;
  setShowDailyReport: (show: boolean) => void;
  showDiscomfortCard: boolean;
  setShowDiscomfortCard: (show: boolean) => void;
  showBettingMachine: boolean;
  setShowBettingMachine: (show: boolean) => void;
  onMissionReport: (success: boolean) => void;
  onDiscomfortAccept: (card: any) => void;
  onBettingSelect: (envelope: any) => void;
}

const PostoDeComandoModals = ({
  progress,
  showPenaltySetup,
  setShowPenaltySetup,
  showPenaltyManagement,
  setShowPenaltyManagement,
  showDailyReport,
  setShowDailyReport,
  showDiscomfortCard,
  setShowDiscomfortCard,
  showBettingMachine,
  setShowBettingMachine,
  onMissionReport,
  onDiscomfortAccept,
  onBettingSelect
}: PostoDeComandoModalsProps) => {
  return (
    <>
      <PenaltySetupModal 
        isOpen={showPenaltySetup}
        onClose={() => setShowPenaltySetup(false)}
      />

      <DailyReportModal 
        isOpen={showDailyReport}
        onClose={() => setShowDailyReport(false)}
        mission={progress.currentMission}
        onReport={onMissionReport}
      />

      <DiscomfortCard 
        onAccept={(card) => {
          onDiscomfortAccept(card);
          setShowDiscomfortCard(false);
        }}
        onDismiss={() => setShowDiscomfortCard(false)}
      />

      <BettingMachine 
        isOpen={showBettingMachine}
        onClose={() => setShowBettingMachine(false)}
        onEnvelopeSelect={(envelope) => {
          onBettingSelect(envelope);
          setShowBettingMachine(false);
        }}
      />

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
    </>
  );
};

export default PostoDeComandoModals;
