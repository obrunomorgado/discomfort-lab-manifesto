
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, AlertTriangle } from 'lucide-react';
import { UserProgress, DailyAction } from '@/types/user';

interface CombatStatusProps {
  progress: UserProgress;
  pendingActions: DailyAction[];
  onShowDailyReport: () => void;
}

const CombatStatus = ({ progress, pendingActions, onShowDailyReport }: CombatStatusProps) => {
  const daysInTreatment = progress.treatmentStartDate ? 
    Math.floor((new Date().getTime() - progress.treatmentStartDate.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div className="space-y-6">
      {/* Current Mission Status */}
      {progress.currentMission && !progress.currentMission.completed && (
        <Card className="border-cyber-cyan/50 bg-gradient-to-br from-cyber-cyan/20 to-military-navy/20 cyber-glow rivet-border">
          <CardHeader className="bg-gradient-to-r from-cyber-cyan/30 to-military-navy/30 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2 font-bebas">
              <Target size={20} />
              <span>MISSÃO ATIVA</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-bebas text-xl text-cyber-cyan mb-2">
                  {progress.currentMission.selectedMission.title}
                </h3>
                <p className="text-warm-gray font-consolas">
                  {progress.currentMission.selectedMission.description}
                </p>
              </div>
              
              {progress.currentMission.isDoubled && (
                <Badge className="bg-cyber-warning/20 border-cyber-warning/50 text-cyber-warning animate-pulse-warning">
                  RISCO DOBRADO ATIVO
                </Badge>
              )}

              <Button 
                onClick={onShowDailyReport}
                className="w-full bg-cyber-cyan text-military-bg hover:bg-cyber-cyan/90 font-bebas"
              >
                REPORTAR MISSÃO
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emergency Combat Alerts */}
      {(progress.isInTreatment || pendingActions.length > 0) && (
        <Card className="border-cyber-warning/50 bg-gradient-to-br from-cyber-warning/20 to-red-800/20 warning-glow animate-pulse-warning rivet-border">
          <CardHeader className="bg-gradient-to-r from-cyber-warning/30 to-red-700/30 text-white rounded-t-lg">
            <CardTitle className="flex items-center space-x-2 font-bebas">
              <AlertTriangle size={20} />
              <span>ALERTA DE COMBATE</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {progress.isInTreatment && (
              <div className="mb-4">
                <div className="text-cyber-warning font-bebas text-lg">
                  RECRUTA FERIDO EM AÇÃO
                </div>
                <p className="text-red-400 font-consolas">
                  {progress.debtPoints} pontos de dívida acumulados • {daysInTreatment} dias em recuperação
                </p>
                <div className="mt-3 p-3 bg-red-900/50 rounded border border-red-500/30">
                  <p className="text-sm text-red-300 font-consolas">
                    ⚠️ <strong>PENALIDADE ATIVA:</strong> Cada dia sem check-in = -2 créditos automáticos
                  </p>
                </div>
              </div>
            )}
            {pendingActions.length > 0 && (
              <div>
                <div className="text-orange-300 font-bebas text-lg">
                  {pendingActions.length} MISSÕES PENDENTES
                </div>
                <div className="mt-2 space-y-2">
                  {pendingActions.slice(0, 3).map((action) => (
                    <div key={action.id} className="flex items-center justify-between p-2 bg-orange-900/30 rounded border border-orange-500/30">
                      <span className="text-sm text-orange-200 font-consolas">{action.description}</span>
                      <Badge variant="outline" className="text-xs text-orange-400 border-orange-500/50 font-consolas">
                        -{action.points} pts/dia
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CombatStatus;
