
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Clock } from 'lucide-react';
import { UserProgress } from '@/types/user';

interface OverviewCardProps {
  progress: UserProgress;
  onShowMissionSelector: () => void;
  onShowDailyReport: () => void;
}

const OverviewCard = ({ progress, onShowMissionSelector, onShowDailyReport }: OverviewCardProps) => {
  const currentMission = progress.currentMission;

  return (
    <Card className="card-base">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-100">
          <Target size={24} className="text-cyber-cyan" />
          <span>MISSÃO ATIVA</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentMission ? (
          <>
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-100">
                {currentMission.selectedMission.title}
              </h3>
              <p className="text-sm text-gray-400">
                {currentMission.selectedMission.description}
              </p>
              {currentMission.isDoubled && (
                <div className="inline-flex items-center px-2 py-1 rounded bg-cyber-warning/20 border border-cyber-warning/50">
                  <span className="text-xs font-bebas text-cyber-warning">DOBRADA</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock size={16} />
              <span>Iniciada em {new Date(currentMission.selectedAt).toLocaleDateString('pt-BR')}</span>
            </div>
            
            <Button 
              onClick={onShowDailyReport}
              className="w-full bg-cyber-cyan text-military-bg hover:bg-cyber-cyan/90 font-bebas text-lg py-6"
            >
              REPORTAR RESULTADO
            </Button>
          </>
        ) : (
          <>
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🎯</div>
              <p className="text-gray-400 mb-6">Nenhuma missão ativa</p>
              <Button 
                onClick={onShowMissionSelector}
                className="bg-cyber-cyan text-military-bg hover:bg-cyber-cyan/90 font-bebas text-lg px-8 py-6"
              >
                SELECIONAR MISSÃO
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
