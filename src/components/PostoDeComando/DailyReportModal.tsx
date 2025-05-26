import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { DailyMissionSelection } from '@/types/missions';
import { CheckCircle, XCircle, AlertTriangle, Zap } from 'lucide-react';

interface DailyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  mission: DailyMissionSelection | null;
  onReport: (success: boolean) => void;
}

const DailyReportModal = ({ isOpen, onClose, mission, onReport }: DailyReportModalProps) => {
  const [missionSuccess, setMissionSuccess] = useState<boolean | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showFlashEffect, setShowFlashEffect] = useState(false);

  if (!isOpen || !mission) return null;

  const handleReport = () => {
    if (missionSuccess === null) return;
    setShowConfirmation(true);
    
    // Trigger flash effect
    setShowFlashEffect(true);
    setTimeout(() => setShowFlashEffect(false), 1500);
  };

  const confirmReport = () => {
    if (missionSuccess !== null) {
      onReport(missionSuccess);
      onClose();
      setMissionSuccess(null);
      setShowConfirmation(false);
      setShowFlashEffect(false);
    }
  };

  const calculatePoints = () => {
    if (!mission || missionSuccess === null) return 0;
    const basePoints = mission.selectedMission.basePoints;
    const multiplied = mission.isDoubled ? basePoints * 2 : basePoints;
    return missionSuccess ? multiplied : 0;
  };

  const calculatePenalty = () => {
    if (!mission || missionSuccess === true) return 0;
    const basePenalty = 5;
    return mission.isDoubled ? basePenalty * 2 : basePenalty;
  };

  return (
    <>
      {/* Flash Effect Overlay */}
      {showFlashEffect && (
        <div className={`fixed inset-0 z-[60] pointer-events-none ${
          missionSuccess 
            ? 'bg-cyber-neon/30 animate-pulse' 
            : 'bg-cyber-warning/40 animate-pulse'
        }`}>
          {!missionSuccess && (
            <div className="absolute inset-0 bg-red-500/20 animate-pulse" 
                 style={{ 
                   animation: 'flash-red 0.3s ease-in-out infinite alternate',
                   animationDuration: '0.2s'
                 }} />
          )}
        </div>
      )}

      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 scanline-overlay">
        <Card className="bg-military-card border-cyber-fuchsia/30 max-w-2xl w-full rivet-border">
          <CardHeader className="bg-gradient-to-r from-cyber-fuchsia/20 to-cyber-cyan/20 rounded-t-lg">
            <CardTitle className="flex items-center space-x-2 font-bebas text-cyber-fuchsia">
              <AlertTriangle size={24} />
              <span>RELATÓRIO DO DIA - MISSÃO COMPLETA</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {!showConfirmation ? (
              <>
                <div className="bg-military-bg/50 p-4 rounded border border-military-border">
                  <h3 className="font-bebas text-lg text-warm-gray mb-2">MISSÃO EXECUTADA:</h3>
                  <p className="font-consolas text-cyber-cyan">{mission.selectedMission.title}</p>
                  <p className="text-sm text-warm-gray/70 mt-1">{mission.selectedMission.description}</p>
                  
                  {mission.isDoubled && (
                    <Badge className="mt-2 bg-cyber-warning/20 border-cyber-warning/50 text-cyber-warning">
                      RISCO DOBRADO ATIVO
                    </Badge>
                  )}
                </div>

                <div className="bg-dark-card/30 p-4 rounded border border-military-border">
                  <h3 className="font-bebas text-lg text-warm-gray mb-4">STATUS DA MISSÃO:</h3>
                  
                  <div className="flex items-center justify-center space-x-8">
                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover-lift ${
                        missionSuccess === true 
                          ? 'border-cyber-neon bg-cyber-neon/20' 
                          : 'border-military-border hover:border-cyber-neon/50'
                      }`}
                      onClick={() => setMissionSuccess(true)}
                    >
                      <div className="text-center">
                        <CheckCircle size={48} className="text-cyber-neon mx-auto mb-2" />
                        <div className="font-bebas text-cyber-neon">MISSÃO</div>
                        <div className="font-bebas text-cyber-neon">CUMPRIDA</div>
                      </div>
                    </div>

                    <div 
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover-lift ${
                        missionSuccess === false 
                          ? 'border-cyber-warning bg-cyber-warning/20' 
                          : 'border-military-border hover:border-cyber-warning/50'
                      }`}
                      onClick={() => setMissionSuccess(false)}
                    >
                      <div className="text-center">
                        <XCircle size={48} className="text-cyber-warning mx-auto mb-2" />
                        <div className="font-bebas text-cyber-warning">MISSÃO</div>
                        <div className="font-bebas text-cyber-warning">FALHADA</div>
                      </div>
                    </div>
                  </div>
                </div>

                {missionSuccess !== null && (
                  <div className="bg-military-bg/50 p-4 rounded border border-military-border">
                    <h3 className="font-bebas text-lg text-warm-gray mb-2">CONSEQUÊNCIAS:</h3>
                    
                    {missionSuccess ? (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Zap size={16} className="text-cyber-neon" />
                          <span className="font-consolas text-cyber-neon">
                            +{calculatePoints()} XP adicionados
                          </span>
                        </div>
                        <div className="text-sm text-warm-gray/70 font-consolas">
                          Disciplina mantida. Continue assim, recruta.
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle size={16} className="text-cyber-warning" />
                          <span className="font-consolas text-cyber-warning">
                            -{calculatePenalty()} créditos de penalidade
                          </span>
                        </div>
                        <div className="text-sm text-cyber-warning/70 font-consolas">
                          Falha detectada. Penalidade aplicada automaticamente.
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button 
                    onClick={onClose}
                    variant="outline"
                    className="flex-1 border-military-border text-warm-gray hover:bg-military-border/20"
                  >
                    CANCELAR
                  </Button>
                  <Button 
                    onClick={handleReport}
                    disabled={missionSuccess === null}
                    className="flex-1 bg-cyber-fuchsia text-military-bg hover:bg-cyber-fuchsia/90 font-bebas"
                  >
                    ENVIAR RELATÓRIO
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className={`text-center p-6 rounded-lg border-2 ${
                  missionSuccess 
                    ? 'border-cyber-neon bg-cyber-neon/10' 
                    : 'border-cyber-warning bg-cyber-warning/10 animate-pulse-warning'
                }`}>
                  {missionSuccess ? (
                    <CheckCircle size={64} className="text-cyber-neon mx-auto mb-4" />
                  ) : (
                    <XCircle size={64} className="text-cyber-warning mx-auto mb-4" />
                  )}
                  
                  <h2 className="font-bebas text-2xl text-warm-gray mb-2">
                    {missionSuccess ? 'MISSÃO CUMPRIDA' : 'FALHA REGISTRADA'}
                  </h2>
                  
                  <p className="font-consolas text-lg">
                    {missionSuccess 
                      ? `+${calculatePoints()} XP adicionados ao seu prontuário`
                      : `${calculatePenalty()} créditos debitados automaticamente`
                    }
                  </p>
                  
                  {!missionSuccess && (
                    <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded">
                      <p className="text-red-400 font-consolas text-sm">
                        ⚠️ ATENÇÃO: 3 falhas consecutivas resultam no Badge de Vergonha
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button 
                    onClick={() => setShowConfirmation(false)}
                    variant="outline"
                    className="flex-1 border-military-border text-warm-gray hover:bg-military-border/20"
                  >
                    VOLTAR
                  </Button>
                  <Button 
                    onClick={confirmReport}
                    className={`flex-1 font-bebas ${
                      missionSuccess 
                        ? 'bg-cyber-neon text-military-bg hover:bg-cyber-neon/90'
                        : 'bg-cyber-warning text-military-bg hover:bg-cyber-warning/90'
                    }`}
                  >
                    ENCERRAR TURNO
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes flash-red {
          0% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </>
  );
};

export default DailyReportModal;
