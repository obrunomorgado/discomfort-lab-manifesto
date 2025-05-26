
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { UserProgress, DailyAction } from '@/types/user';

interface OperationScheduleProps {
  progress: UserProgress;
  pendingActions: DailyAction[];
}

const OperationSchedule = ({ progress, pendingActions }: OperationScheduleProps) => {
  return (
    <Card className="bg-military-card border-military-border rivet-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 font-bebas text-warm-gray">
          <Clock size={20} className="text-cyber-cyan" />
          <span>AGENDA DE OPERAÇÕES</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 bg-cyber-cyan/20 rounded border border-cyber-cyan/30">
            <div className="font-medium text-sm text-cyber-cyan font-bebas">Check-in Diário</div>
            <div className="text-xs text-cyber-cyan font-consolas">Obrigatório - Penalidade: -2 créditos</div>
          </div>
          {progress.isInTreatment && (
            <div className="p-3 bg-cyber-warning/20 rounded border border-cyber-warning/30 animate-pulse-warning">
              <div className="font-medium text-sm text-cyber-warning font-bebas">Ações de Recuperação</div>
              <div className="text-xs text-cyber-warning font-consolas">{pendingActions.length} pendentes</div>
            </div>
          )}
          <div className="p-3 bg-cyber-neon/20 rounded border border-cyber-neon/30">
            <div className="font-medium text-sm text-cyber-neon font-bebas">Próxima Missão</div>
            <div className="text-xs text-cyber-neon font-consolas">Disponível agora</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OperationSchedule;
